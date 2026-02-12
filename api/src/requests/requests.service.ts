import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CircleRequest, RequestDocument } from './schemas/request.schema';
import { CirclesService } from '../circles/circles.service';
import { UsersService } from '../users/users.service';
import { CircleMember } from '../circles/schemas/circle-member.schema';
import { MatchCriteriaDto, RequestRole } from './dto/match-criteria.dto';

@Injectable()
export class RequestsService {
  private readonly MAX_CIRCLE_CAPACITY = 20;

  constructor(
    @InjectModel(CircleRequest.name)
    private requestModel: Model<RequestDocument>,
    private circlesService: CirclesService,
    private usersService: UsersService,
  ) {}

  async createJoinRequest(
    userId: string,
    circleId: string,
    criteria: MatchCriteriaDto,
  ) {
    const circle = await this.circlesService.findById(circleId);
    if (!circle) throw new NotFoundException('Circle not found');

    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const isMember = await this.circlesService.isMember(circleId, userId);
    if (isMember) {
      throw new BadRequestException('User is already a member of this circle');
    }

    const existingRequest = await this.requestModel.findOne({
      userId: new Types.ObjectId(userId),
      targetCircleId: new Types.ObjectId(circleId),
      status: 'PENDING',
    });
    if (existingRequest) {
      throw new BadRequestException(
        'User already has a pending request for this circle',
      );
    }

    // VALIDATION OF CRITERIA
    if (criteria.role === RequestRole.MENTOR) {
      const isNative = user.nativeLanguages.includes(criteria.language);
      const isAdvanced = user.targetLanguages.find(
        (t) => t.language === criteria.language && t.level === 'ADVANCED',
      );
      // it must be at least one of both to be a MENTOR
      if (!isNative && !isAdvanced) {
        throw new BadRequestException(
          `To be a Mentor in ${criteria.language}, you must be NATIVE or ADVANCED.`,
        );
      }
      if (isNative) {
        criteria.level = 'NATIVE';
      } else {
        criteria.level = 'ADVANCED';
      }
    } else {
      const targetLang = user.targetLanguages.find(
        (t) =>
          t.language.trim().toLowerCase() ===
          criteria.language.trim().toLowerCase(),
      );
      if (!targetLang) {
        throw new BadRequestException(
          `User is not learning ${criteria.language}`,
        );
      }
      criteria.level = targetLang.level;
    }

    if (circle.members.length >= this.MAX_CIRCLE_CAPACITY) {
      throw new BadRequestException('Circle has reached maximum capacity');
    }

    if (!circle.languages.includes(criteria.language)) {
      throw new BadRequestException(
        'This circle does not support the requested language',
      );
    }

    if (circle.level === 'ADVANCED' && criteria.level === 'BEGINNER') {
      throw new BadRequestException('Beginners cannot join Advanced circles');
    }

    if (circle.type === 'EXCHANGE' && criteria.role === RequestRole.LEARNER) {
      const mentorsOfTargetLanguage = circle.members.filter(
        (m) => m.role === 'MENTOR' && m.language === criteria.language,
      ).length;

      const learnersOfTargetLanguage = circle.members.filter(
        (m) => m.role === 'LEARNER' && m.language === criteria.language,
      ).length;

      // CASE 1: No mentor for the langauge
      if (mentorsOfTargetLanguage === 0) {
        throw new BadRequestException(
          `This circle needs a ${criteria.language} Mentor before accepting more ${criteria.language} Learners.`,
        );
      }

      // CASE 2: We calculate the ratio for the langauge
      const projectedRatio =
        (learnersOfTargetLanguage + 1) / mentorsOfTargetLanguage;

      if (projectedRatio > 4) {
        throw new BadRequestException(
          `The ratio for ${criteria.language} is full. We need more Mentors of ${criteria.language}.`,
        );
      }
    }

    const newRequest = new this.requestModel({
      userId: new Types.ObjectId(userId),
      targetCircleId: new Types.ObjectId(circleId),
      type: 'JOIN',
      status: 'PENDING',
      memberName: user.name,
      matchCriteria: criteria,
    });

    return newRequest.save();
  }

  async approveRequest(requestId: string, adminUserId: string) {
    const request = await this.requestModel.findById(requestId);
    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException(`Request is already ${request.status}`);
    }
    const circle = await this.circlesService.findById(
      request.targetCircleId.toString(),
    );
    if (!circle) throw new NotFoundException('Target Circle not found');

    const adminMember = circle.members.find(
      (m) => m.userId.toString() === adminUserId,
    );
    if (!adminMember) {
      throw new ForbiddenException('You are not a member of this circle');
    }

    if (adminMember.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only the Circle Admin can approve requests',
      );
    }

    const { role, language, level } = request.matchCriteria;

    const memberData: CircleMember = {
      userId: request.userId,
      name: request.memberName,
      role: role,
      level: level,
      language: language,
      joinedAt: new Date(),
    };

    await this.circlesService.addMember(
      request.targetCircleId.toString(),
      memberData,
    );

    await this.usersService.linkUserToCircle(
      request.userId.toString(),
      request.targetCircleId.toString(),
      circle.type,
    );

    request.status = 'MATCHED';
    return request.save();
  }

  async findAllPendingForCircle(circleId: string) {
    return this.requestModel
      .find({
        targetCircleId: new Types.ObjectId(circleId),
        status: 'PENDING',
      })
      .select('-memberName')
      .populate(
        'userId',
        'nativeLanguages targetLanguages -name -avatar -email',
      )
      .exec();
  }
}

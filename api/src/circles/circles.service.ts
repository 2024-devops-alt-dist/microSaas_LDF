import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Circle } from './schemas/circle.schema';
import { CircleMember } from './schemas/circle-member.schema';
import { CreateCircleDto } from './dto/create-circle.dto';
import { UpdateCircleDto } from './dto/update-circle.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CirclesService {
  constructor(
    @InjectModel(Circle.name) private circleModel: Model<Circle>,
    private usersService: UsersService,
  ) {}

  // 1. CORE CRUD
  async create(
    createCircleDto: CreateCircleDto,
    creatorId: string,
  ): Promise<Circle> {
    const user = await this.usersService.findOne(creatorId);
    if (!user) throw new NotFoundException('User not found');

    let qualifiedLanguage: string | undefined = undefined;
    let initialLevel = 'NATIVE';

    if ((createCircleDto.type as string) === 'EXCHANGE') {
      qualifiedLanguage = createCircleDto.languages.find((langCode) => {
        const isNative = user.nativeLanguages.includes(langCode);
        const isAdvanced = user.targetLanguages.some(
          (t) => t.language === langCode && t.level === 'ADVANCED',
        );

        if (isAdvanced && !isNative) initialLevel = 'ADVANCED';

        return isNative || isAdvanced;
      });

      if (!qualifiedLanguage) {
        throw new BadRequestException(
          `To create an Exchange Circle, you must be NATIVE or ADVANCED in at least one of the selected languages (${createCircleDto.languages.join(', ')}).`,
        );
      }
    } else {
      qualifiedLanguage = createCircleDto.languages[0];
    }

    const adminMember: CircleMember = {
      userId: new Types.ObjectId(creatorId),
      name: user.name,
      role: 'ADMIN',
      level: initialLevel,
      language: qualifiedLanguage,
      joinedAt: new Date(),
    };

    const createdCircle = new this.circleModel({
      ...createCircleDto,
      members: [adminMember],
    });

    await this.usersService.linkUserToCircle(
      creatorId,
      createdCircle._id.toString(),
      createCircleDto.type,
    );

    return createdCircle.save();
  }

  async remove(id: string): Promise<Circle> {
    const deletedCircle = await this.circleModel.findByIdAndDelete(id);
    if (!deletedCircle) {
      throw new NotFoundException(`Circle with ID ${id} not found`);
    }
    return deletedCircle;
  }

  async update(id: string, updateCircleDto: UpdateCircleDto): Promise<Circle> {
    const updatedCircle = await this.circleModel.findByIdAndUpdate(
      id,
      updateCircleDto,
      { new: true },
    );
    if (!updatedCircle) {
      throw new NotFoundException(`Circle with ID ${id} not found`);
    }
    return updatedCircle;
  }

  async findAll(): Promise<Circle[]> {
    return this.circleModel.find().exec();
  }

  async findById(id: string): Promise<Circle> {
    const circle = await this.circleModel.findById(id).exec();
    if (!circle) {
      throw new NotFoundException(`Circle with ID ${id} not found`);
    }
    return circle;
  }

  // 2. CUSTOM QUERIES

  async findMyCircles(userId: string): Promise<Circle[]> {
    const userObjectId = new Types.ObjectId(userId);

    return this.circleModel
      .find({
        'members.userId': userObjectId, // Busca en miembros (Practice)
      })
      .exec();
  }

  async findByType(type: string): Promise<Circle[]> {
    return this.circleModel.find({ type }).exec();
  }

  // USER MANAGEMENT METHODS

  async addMember(circleId: string, memberData: CircleMember): Promise<Circle> {
    const updatedCircle = await this.circleModel.findByIdAndUpdate(
      circleId,
      { $push: { members: memberData } },
      { new: true },
    );

    if (!updatedCircle) {
      throw new NotFoundException(`Circle with ID ${circleId} not found`);
    }
    return updatedCircle;
  }

  async leaveCircle(circleId: string, userId: string): Promise<Circle> {
    const updatedCircle = await this.circleModel.findByIdAndUpdate(
      circleId,
      { $pull: { members: { userId: new Types.ObjectId(userId) } } },
      { new: true },
    );

    if (!updatedCircle) {
      throw new NotFoundException(`Circle with ID ${circleId} not found`);
    }
    return updatedCircle;
  }

  // VALIDATIONS AND HELPERS

  async exists(circleId: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(circleId)) return false;
    const exists = await this.circleModel.exists({ _id: circleId });
    return !!exists;
  }

  async isMember(circleId: string, userId: string): Promise<boolean> {
    const userObjectId = new Types.ObjectId(userId);
    const count = await this.circleModel.countDocuments({
      _id: circleId,
      'members.userId': userObjectId,
    });
    return count > 0;
  }

  // async requestJoinCircle(
  //   circleId: string,
  //   memberData: JoinRequestDto,
  // ): Promise<Circle> {
  //   const userObjectId = new Types.ObjectId(memberData.userId);
  //   const newMember: CircleMember = {
  //     ...memberData,
  //     isMentor: false,
  //     userId: userObjectId,
  //   };

  //   const exists = await this.circleModel.findOne({
  //     _id: circleId,
  //     $or: [
  //       { 'members.userId': userObjectId },
  //       { 'requests.userId': userObjectId },
  //     ],
  //   });

  //   if (exists) {
  //     throw new Error('User is already a member or has a pending request');
  //   }

  //   const updatedCircle = await this.circleModel.findByIdAndUpdate(
  //     circleId,
  //     { $push: { requests: newMember } },
  //     { new: true },
  //   );

  //   if (!updatedCircle) {
  //     throw new NotFoundException(`Circle with ID ${circleId} not found`);
  //   }
  //   return updatedCircle;
  // }

  // async approveRequest(circleId: string, userId: string): Promise<Circle> {
  //   const userObjectId = new Types.ObjectId(userId);
  //   const circle = await this.circleModel.findOne({
  //     _id: circleId,
  //     'requests.userId': userObjectId,
  //   });

  //   if (!circle) {
  //     throw new NotFoundException(
  //       `No pending request found for user ID ${userId} in circle ID ${circleId}`,
  //     );
  //   }

  //   const memberData = circle.requests?.find(
  //     (req) => req.userId.toString() === userId,
  //   );
  //   const updatedCircle = await this.circleModel.findByIdAndUpdate(
  //     circleId,
  //     {
  //       $pull: { requests: { userId: userObjectId } },
  //       $push: { members: memberData },
  //     },
  //     { new: true },
  //   );

  //   if (!updatedCircle) {
  //     throw new NotFoundException(`Circle with ID ${circleId} not found`);
  //   }
  //   return updatedCircle;
  // }
}

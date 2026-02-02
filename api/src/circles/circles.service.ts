import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Circle } from './schemas/circle.schema';
import { CircleMember } from './schemas/circle-member.schema';
import { CreateCircleDto } from './dto/create-circle.dto';
import { UpdateCircleDto } from './dto/update-circle.dto';

@Injectable()
export class CirclesService {
  constructor(@InjectModel(Circle.name) private circleModel: Model<Circle>) {}

  // 1. CORE CRUD
  async create(creatCircleDto: CreateCircleDto): Promise<Circle> {
    const createdCircle = new this.circleModel(creatCircleDto);
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

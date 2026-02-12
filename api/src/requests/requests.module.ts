import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { CircleRequest, RequestSchema } from './schemas/request.schema';
import { CirclesModule } from '../circles/circles.module';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CircleRequest.name, schema: RequestSchema },
    ]),
    CirclesModule,
    UsersModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}

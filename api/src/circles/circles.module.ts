import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CirclesService } from './circles.service';
import { CirclesController } from './circles.controller';
import { Circle, CircleSchema } from './schemas/circle.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Circle.name, schema: CircleSchema }]),
    UsersModule,
  ],
  controllers: [CirclesController],
  providers: [CirclesService],
  exports: [CirclesService],
})
export class CirclesModule {}

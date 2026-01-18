import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CirclesService } from './circles.service';
import { CirclesController } from './circles.controller';
import { Circle, CircleSchema } from './schemas/circle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Circle.name, schema: CircleSchema }]),
  ],
  controllers: [CirclesController],
  providers: [CirclesService],
  exports: [CirclesService],
})
export class CirclesModule {}

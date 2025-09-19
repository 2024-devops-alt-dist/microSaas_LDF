import { Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TerminusModule, MongooseModule],
  controllers: [HealthcheckController],
})
export class HealthcheckModule {}

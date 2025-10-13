import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { UsersModule } from './users/users.module';
import { CirclesModule } from './circles/circles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    HealthcheckModule,
    UsersModule,
    CirclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

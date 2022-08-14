import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiarySchema } from './diary.entity';
import { DiaryGateway } from './diary.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Diary', schema: DiarySchema }]),
    JwtModule.register({}),
    AuthModule,
  ],
  providers: [DiaryService, DiaryGateway],
  controllers: [DiaryController],
})
export class DiaryModule {}

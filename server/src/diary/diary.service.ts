import {
  Injectable,
  Logger,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { UserDocument } from './../auth/user.entity';
import { DiaryDocument } from './diary.entity';

@UseGuards(AuthGuard())
@Injectable()
export class DiaryService {
  constructor(
    @InjectModel('Diary') private readonly diaryModel: Model<DiaryDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private logger: Logger = new Logger('DiaryGateWay');
  private connectedUsers = new Map();
  private defaultValue = '';

  addNewConnectedUser = (clientId: string, userId: string) => {
    this.connectedUsers.set(clientId, { userId });
    this.logger.log('new connected users');
    console.log(this.connectedUsers);
  };

  removeConnectedUser = (clientId: string) => {
    if (this.connectedUsers.has(clientId)) {
      this.connectedUsers.delete(clientId);
      this.logger.log('new connected users');
      console.log(this.connectedUsers);
    }
  };

  async findOrCreateDocument(ident: string, userId: string) {
    if (ident == null || !ident.includes(userId)) return;

    const diary = await this.diaryModel.findOne({ ident });
    if (diary) return diary;

    const newDiary = await this.diaryModel.create({
      ident,
      data: this.defaultValue,
    });
    const user = await this.userModel.findById({ _id: userId });
    user.diaries.push(newDiary._id);
    user.save();
    return newDiary;
  }

  async updateDiary(ident: string, data) {
    return await this.diaryModel.findOneAndUpdate({ ident }, { data: data });
  }
}

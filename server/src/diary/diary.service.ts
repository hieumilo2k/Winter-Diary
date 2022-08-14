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
import { DiaryDocument } from './diary.entity';

@UseGuards(AuthGuard())
@Injectable()
export class DiaryService {
  constructor(
    @InjectModel('Diary') private readonly diaryModel: Model<DiaryDocument>,
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

  getCurrentUserId(token: string) {
    try {
      const { id } = this.jwtService.verify(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });
      return id;
    } catch (error) {
      throw new UnauthorizedException('Websocket token is invalid');
    }
  }

  async findOrCreateDocument(ident: string) {
    if (ident == null) return;

    const diary = await this.diaryModel.findOne({ ident });
    if (diary) return diary;
    return await this.diaryModel.create({ ident, data: this.defaultValue });
  }

  async updateDiary(ident: string, data) {
    return await this.diaryModel.findOneAndUpdate({ ident }, { data: data });
  }
}

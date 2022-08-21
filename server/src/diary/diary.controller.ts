import { Response } from 'express';
import { DiaryService } from './diary.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@UseGuards(AuthGuard())
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get('document/:docId')
  async getDocument(
    @Param('docId') docId: string,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const { _id: id } = user;
    const document = await this.diaryService.getDocument(docId, id);
    return res.json(document);
  }

  @Delete('document/:docId')
  async deleteDocument(
    @Param('docId') docId: string,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    try {
      const { _id: id } = user;
      const data = await this.diaryService.deleteDocument(docId, id);
      return data;
    } catch (error) {
      return { msg: error.message };
    }
  }
}

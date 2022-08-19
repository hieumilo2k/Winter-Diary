import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  async getUser(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(id)
      .select('-password')
      .populate('diaries', '_id createdAt');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<{ msg: string }> {
    const { firstName, lastName, avatar, password } = updateUserDto;
    if (password) {
      const passwordHash = await bcrypt.hash(password, 12);
      await this.userModel.findOneAndUpdate(
        { _id: id },
        { firstName, lastName, avatar, password: passwordHash },
      );
    } else {
      await this.userModel.findOneAndUpdate(
        { _id: id },
        { firstName, lastName, avatar },
      );
    }
    return { msg: 'Update Success!' };
  }

  removeTmp(path) {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  }
}

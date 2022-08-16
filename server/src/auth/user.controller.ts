import { UpdateUserDto } from './dtos/updateUser.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseFilePipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('CLOUD_API_KEY'),
      api_secret: this.configService.get('CLOUD_API_SECRET'),
    });
  }
  @Get('profile')
  getUser(@GetUser() user: User) {
    return this.userService.getUser(user._id);
  }

  @Patch('update')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<{ msg: string }> {
    const { _id: id } = user;
    const data = await this.userService.updateUser(updateUserDto, id);
    return data;
  }

  @Post('uploadAvatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      dest: './tmp',
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  async uploadAvatar(
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          // new FileTypeValidator({ fileType: /\/(jpg|jpeg|png|gif)$/ }),
        ],
        exceptionFactory(error) {
          throw new BadRequestException(error);
        },
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      cloudinary.uploader.upload(
        file.path,
        {
          folder: 'WinterDiary',
          width: 150,
          height: 150,
          crop: 'fill',
        },
        async (err, result) => {
          if (err) throw err;
          this.userService.removeTmp(file.path);
          return res.json({ url: result.secure_url });
        },
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

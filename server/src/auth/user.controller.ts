import { UpdateUserDto } from './dtos/updateUser.dto';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
}

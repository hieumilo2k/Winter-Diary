import { SignInUserDto } from './dtos/signInUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ActivateEmailDto } from './dtos/activateEmail.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRepository } from './auth.repository';
import { ActivationTokenDto } from './dtos/activationToken.dto';
import { UserDocument } from './user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dtos/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ msg: string }> {
    const { username, email, password, firstName, lastName } = createUserDto;

    const user = await this.userModel.findOne({ email });
    if (user) throw new BadRequestException('This email already exists');

    const newUser: ActivationTokenDto = {
      email,
      username,
      password,
      firstName,
      lastName,
    };

    const activationToken = this.authRepository.createActivationToken(newUser);
    const url = `${this.configService.get(
      'CLIENT_URL',
    )}/user/activate/${activationToken}`;
    this.authRepository.sendEmail(email, url, 'Verify your email address');
    return { msg: 'Register Success! Please activate your email to start.' };
  }

  async activateEmail(
    activationEmail: ActivateEmailDto,
  ): Promise<{ msg: string }> {
    const { activationToken } = activationEmail;
    const user: ActivationTokenDto = this.jwtService.verify(activationToken, {
      secret: this.configService.get('ACTIVATION_TOKEN_SECRET'),
    });
    const { email, username, password, firstName, lastName } = user;

    const checkEmail = await this.userModel.findOne({ email });
    if (checkEmail) throw new BadRequestException('This email already exists');

    const newUser = new this.userModel({
      email,
      username,
      password,
      firstName,
      lastName,
    });

    await newUser.save();

    return { msg: 'Account has been activated!' };
  }

  async signIn(
    signInUserDto: SignInUserDto,
  ): Promise<{ refreshToken: string }> {
    const { username, password } = signInUserDto;
    const user = await this.userModel.findOne({ username });

    if (!user) throw new BadRequestException('This email does not exits.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Password is incorrect.');

    const refreshToken = this.authRepository.createRefreshToken({
      id: user._id,
    });

    return { refreshToken };
  }

  async getAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    const user: RefreshTokenDto = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });

    if (!user) throw new BadRequestException('Please login now !');

    const { id } = user;

    const accessToken = this.authRepository.createAccessToken({ id });
    return { accessToken };
  }

  async forgotPassword(email: string): Promise<{ msg: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('This email does not exits.');

    const accessToken = this.authRepository.createAccessToken({ id: user._id });

    //send Mail
    const url = `${this.configService.get(
      'CLIENT_URL',
    )}/api/auth/resetPassword/${accessToken}`;
    this.authRepository.sendEmail(email, url, 'Reset your password');

    return { msg: 'Please check your email to reset your password.' };
  }

  async resetPassword(id: string, password: string): Promise<{ msg: string }> {
    const passwordHash = await bcrypt.hash(password, 12);
    await this.userModel.findOneAndUpdate(
      { _id: id },
      { password: passwordHash },
    );
    return { msg: 'Password successfully changed!' };
  }
}

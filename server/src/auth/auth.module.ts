import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({}),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, AuthRepository, UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, MongooseModule],
})
export class AuthModule {}

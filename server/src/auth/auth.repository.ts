import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActivationTokenDto } from './dtos/activationToken.dto';
import { AccessTokenDto } from './dtos/accessToken.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

const { OAuth2 } = google.auth;

@Injectable()
export class AuthRepository {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  createActivationToken = (payload: ActivationTokenDto) => {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('ACTIVATION_TOKEN_SECRET'),
      expiresIn: '5m',
    });
  };

  createAccessToken = (payload: AccessTokenDto) => {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: '15m',
    });
  };

  createRefreshToken = (payload: RefreshTokenDto) => {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });
  };

  sendEmail = (to: string, url: string, txt: string) => {
    const oauth2Client = new OAuth2(
      this.configService.get('MAILING_SERVICE_CLIENT_ID'),
      this.configService.get('MAILING_SERVICE_CLIENT_SECRET'),
      this.configService.get('MAILING_SERVICE_REDIRECT_URI'),
    );
    oauth2Client.setCredentials({
      refresh_token: this.configService.get('MAILING_SERVICE_REFRESH_TOKEN'),
    });

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('SENDER_EMAIL_ADDRESS'),
        clientId: this.configService.get('MAILING_SERVICE_CLIENT_ID'),
        clientSecret: this.configService.get('MAILING_SERVICE_CLIENT_SECRET'),
        refreshToken: this.configService.get('MAILING_SERVICE_REFRESH_TOKEN'),
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: '"NTHMiLo 😎" <vinaphone5gb@gmail.com>',
      to: to,
      subject: 'Winter Diary 📖🖋',
      html: `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <div style="text-align: center">
            <img src="https://res.cloudinary.com/wintersonata/image/upload/v1660357144/WinterDiary/logo192.png" style="max-width: 120px; text-align: center"/>
            </div>
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Winter Diary !</h2>
            <p>Congratulations! You're almost set to start using Winter Diary.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, Please Try Again 😥</p>
            <h1 style="text-align: center; margin-top: 50px">Thank you ! </h1>
            <h3 style="text-align: right">NTHMiLo</h3>
            </div>
    `,
    };

    smtpTransport.sendMail(mailOptions, (err, infor) => {
      if (err) return err;
      return infor;
    });
  };
}

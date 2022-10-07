import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';

const FRONTEND_PATH = join(__dirname, '..', '..', 'client', 'build');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: FRONTEND_PATH,
    //   exclude: ['nth/api/v1*'],
    //   serveStaticOptions: {
    //     setHeaders: function (res, path) {
    //       // Prevent catching of the frontend files
    //       if (path === join(FRONTEND_PATH, 'index.html')) {
    //         res.setHeader('Cache-control', 'public, max-age=0');
    //       }
    //     }
    //   }
    // }),
    AuthModule,
    DiaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

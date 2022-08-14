import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1 style="text-align: center; margin:50px 0 80px 0; font-size: 60px">📢 Welcome to Winter Diary 📖🖋! 😎</h1>
      <h1 style="text-align: center; font-size: 50px">💻</h1>
      <h3 style="text-align: center; font-size: 40px">🧐 Ngô Trung Hiếu  - Winter Wind 🧐</h3>
    `;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  postData(text: any): string {
    console.log(text);
    return text;
  }
}

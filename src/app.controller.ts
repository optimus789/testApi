import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:text')
  getHello(@Param() text: any): string {
    console.log(text);
    return this.appService.getHello();
  }

  @Post('postData')
  postData(@Body() text: any): string {
    console.log(text);
    console.log(JSON.parse(text));
    let plainText = text.text;
    plainText = plainText.replace(/<style([\s\S]*?)<\/style>/gi, '');
    plainText = plainText.replace(/<script([\s\S]*?)<\/script>/gi, '');
    plainText = plainText.replace(/<\/div>/gi, '\n');
    plainText = plainText.replace(/<\/li>/gi, '\n');
    plainText = plainText.replace(/<li>/gi, '  *  ');
    plainText = plainText.replace(/<\/ul>/gi, '\n');
    plainText = plainText.replace(/<\/p>/gi, '\n');
    plainText = plainText.replace(/<br\s*[\/]?>/gi, '\n');
    plainText = plainText.replace(/<[^>]+>/gi, '');
    return this.appService.postData(plainText);
  }
}

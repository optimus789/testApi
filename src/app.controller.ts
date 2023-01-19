import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:text')
  getHello(@Param() text: any): string {
    console.log(text)
    return this.appService.getHello();
  }

  @Post('postData')
  postData(@Body() text: any): string {
    console.log(text);
    let plainText = text.text;
    plainText =plainText.replace(/<style([\s\S]*?)<\/style>/gi, '');
    plainText = plainText.replace(/<script([\s\S]*?)<\/script>/gi, '');
    plainText = plainText.replace(/<\/div>/ig, '\n');
    plainText = plainText.replace(/<\/li>/ig, '\n');
    plainText = plainText.replace(/<li>/ig, '  *  ');
    plainText = plainText.replace(/<\/ul>/ig, '\n');
    plainText = plainText.replace(/<\/p>/ig, '\n');
    plainText = plainText.replace(/<br\s*[\/]?>/gi, "\n");
    plainText = plainText.replace(/<[^>]+>/ig, '');
    return this.appService.postData(plainText);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
let mainHtml;
let mainText;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 

  @Get('html')
  getHtml(): string {
    return mainHtml;
  }
  @Get('text')
  getText(): string {
    return mainText;
  }

  @Post('postData')
  postData(@Body() text: any): string {
    console.log(text);
    let plainText = text.text;
    mainHtml = plainText;
    plainText = plainText.replace(/<style([\s\S]*?)<\/style>/gi, '');
    plainText = plainText.replace(/<script([\s\S]*?)<\/script>/gi, '');
    plainText = plainText.replace(/<\/div>/gi, '\n');
    plainText = plainText.replace(/<\/li>/gi, '\n');
    plainText = plainText.replace(/<li>/gi, '  *  ');
    plainText = plainText.replace(/<\/ul>/gi, '\n');
    plainText = plainText.replace(/<\/p>/gi, '\n');
    plainText = plainText.replace(/<br\s*[\/]?>/gi, '\n');
    plainText = plainText.replace(/<[^>]+>/gi, '');
    mainText = plainText;
    return this.appService.postData(plainText);
  }
}

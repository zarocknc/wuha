import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get(':sessionName')
  async createSession(@Param('sessionName') sessionName: string) {
    const client = await this.appService.createSession(sessionName);
    console.log('cliente es: ', client);
    return { message: `Sesion ${sessionName} creada` };
  }
  @Post('send-message')
  async sendMessage(@Body() messageData: any) {
    const { sessionName, message, number } = messageData;
    await this.appService.sendMessage(sessionName, message, number);
    return { message: `Mensaje enviado a ${number}` };
  }
}

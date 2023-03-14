import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

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

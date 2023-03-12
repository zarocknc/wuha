import { Injectable } from '@nestjs/common';
import { create } from 'venom-bot';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async createSession(sessionName: string): Promise<any> {
    const client = await create({ session: sessionName });
    return client;
  }
  async sendMessage(
    sessionName: string,
    message: string,
    number: string,
  ): Promise<any> {
    const client = await create(sessionName);
    await client.sendText(number, message);
    await client.close();
  }
}

import { Injectable } from '@nestjs/common';
import { Message } from '@system4blue/shared/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}

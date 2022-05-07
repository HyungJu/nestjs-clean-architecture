import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserJoinEvent {
  @OnEvent('user.joined')
  handleOrderCreatedEvent(payload: any) {
    console.log('TEST');
    console.log(payload);
  }
}

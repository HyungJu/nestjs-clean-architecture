import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserCreateCommand } from '../dtos/UserCreateCommand';
import { EventEmitter } from '../../../domain/event/EventEmitter';

@Injectable()
export class TestUserCreator {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
    @Inject('EventEmitter') private eventEmitter: EventEmitter,
  ) {}

  public call(data: UserCreateCommand) {
    console.log(this.eventEmitter.emit('user.joined', 'test'));
    return this.userRepository.create(data);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/domain/user.repository';
import { EventEmitter } from '../../../../core/domain/event/EventEmitter';
import { UserCreateInput } from '@app/user/domain/dtos/UserCreateInput';
import { User } from '@app/user/domain/user.entity';
import { USER } from '@app/user/user.provider';
import { APP } from '@app/app.provider';

@Injectable()
export class CreateUser {
  constructor(
    @Inject(USER.USER_REPOSITORY) private userRepository: UserRepository,
    @Inject(APP.EVENT_EMITTER) private eventEmitter: EventEmitter,
  ) {}

  async create(userCreateInput: UserCreateInput): Promise<User> {
    const res = await this.userRepository.create(userCreateInput);

    const user = new User(res);
    this.eventEmitter.emit('UserWithdrawal', user);

    return user;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/domain/user.repository';
import { EventEmitter } from '@app/core/domain/event/EventEmitter';
import { UserCreateInput } from '@app/user/domain/dtos/UserCreateInput';
import { User } from '@app/user/domain/user.entity';
import { USER } from '@app/user/user.provider';
import { APP } from '@app/app.provider';
import { UserAlreadyExists } from '@app/user/domain/exceptions/UserAlreadyExists';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUser {
  constructor(
    @Inject(USER.REPOSITORY) private userRepository: UserRepository,
    @Inject(APP.EVENT_EMITTER) private eventEmitter: EventEmitter,
  ) {}

  async create(userCreateInput: UserCreateInput): Promise<User> {
    const user = await this.userRepository.findByEmail(userCreateInput.email);
    if (user) throw new UserAlreadyExists();

    const passwordEncrypted = await bcrypt.hash(userCreateInput.password, 10);
    const res = await this.userRepository.create({
      ...userCreateInput,
      password: passwordEncrypted,
    });
    const createdUser = new User(res);
    this.eventEmitter.emit('UserJoined', createdUser);

    return createdUser;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { EventEmitter } from '../../../../domain/event/EventEmitter';
import { UserLoginCommand } from '@app/user/application/dtos/UserLoginCommand';
import * as bcrypt from 'bcrypt';
import { UserNotFound } from '@app/user/application/exceptions/UserNotFound';

@Injectable()
export class LoginUser {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
    @Inject('EventEmitter') private eventEmitter: EventEmitter,
  ) {}

  public async invoke(data: UserLoginCommand): Promise<string> {
    const user = await this.userRepository.findUserByEmail(data.email);
    if (!user) throw new UserNotFound();

    const isPasswordMatches = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatches) throw new UserNotFound();

    return user.name;
  }
}

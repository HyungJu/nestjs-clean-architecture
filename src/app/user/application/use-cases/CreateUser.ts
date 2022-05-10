import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserCreateCommand } from '../dtos/UserCreateCommand';
import { EventEmitter } from '../../../../domain/event/EventEmitter';
import { User } from '@app/user/domain/user.entity';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyInUse } from '@app/user/application/exceptions/EmailAlreadyInUse';

@Injectable()
export class CreateUser {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
    @Inject('EventEmitter') private eventEmitter: EventEmitter,
  ) {}

  public async invoke(data: UserCreateCommand): Promise<User> {
    console.log(this.eventEmitter.emit('user.joined', 'test'));

    const isUserExists = await this.userRepository.findUserByEmail(data.email);
    if (isUserExists) throw new EmailAlreadyInUse();

    const password = await this.hashPassword(data.password);
    return await this.userRepository.create({
      ...data,
      password,
    });
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

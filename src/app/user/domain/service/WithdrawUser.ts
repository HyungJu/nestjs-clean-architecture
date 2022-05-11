import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/domain/user.repository';
import { EventEmitter } from '../../../core/domain/event/EventEmitter';
import { USER } from '@app/user/user.provider';
import { APP } from '@app/app.provider';

@Injectable()
export class WithdrawUser {
  constructor(
    @Inject(USER.USER_REPOSITORY) private userRepository: UserRepository,
    @Inject(APP.EVENT_EMITTER) private eventEmitter: EventEmitter,
  ) {}

  async withdraw(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new HttpException('user not found', 404);
    user.withdraw();

    await this.userRepository.persist(user);
    this.eventEmitter.emit('UserWithdrawal', user);
  }
}

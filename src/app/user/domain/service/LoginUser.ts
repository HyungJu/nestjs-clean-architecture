import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@app/user/domain/user.repository';
import { EventEmitter } from '@app/core/domain/event/EventEmitter';
import { USER } from '@app/user/user.provider';
import { APP } from '@app/app.provider';
import { UserNotExists } from '@app/user/domain/exceptions/UserNotExists';
import { UserLoginRequest } from '@app/user/presentation/dtos/UserLoginRequest';
import { JwtService } from '@app/user/domain/service/JwtService';

@Injectable()
export class LoginUser {
  constructor(
    @Inject(USER.REPOSITORY) private userRepository: UserRepository,
    @Inject(APP.EVENT_EMITTER) private eventEmitter: EventEmitter,
    @Inject(USER.JWT_SERVICE) private jwtService: JwtService,
  ) {}

  async login(userCreateInput: UserLoginRequest): Promise<string> {
    const user = await this.userRepository.findByEmail(userCreateInput.email);
    if (!user) throw new UserNotExists();

    await user.password.checkPassword(userCreateInput.password);
    this.eventEmitter.emit('UserLogined', user);
    return this.jwtService.sign({
      sub: user.id,
    });
  }
}

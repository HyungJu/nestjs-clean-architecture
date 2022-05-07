import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserCreateCommand } from '../dtos/UserCreateCommand';

@Injectable()
export class TestUserCreator {
  constructor(private userRepository: UserRepository) {}

  public call(data: UserCreateCommand) {
    return this.userRepository.create(data);
  }
}

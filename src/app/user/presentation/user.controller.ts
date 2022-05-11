import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateRequest } from './dtos/UserCreateRequest';
import { UserCreateResponse } from '@app/user/presentation/dtos/UserCreateResponse';
import { CreateUser } from '@app/user/domain/service/CreateUser';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  async create(@Body() userCreateRequest: UserCreateRequest): Promise<UserCreateResponse> {
    const user = await this.createUser.create(userCreateRequest);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}

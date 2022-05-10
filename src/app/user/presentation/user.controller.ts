import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateRequest } from './dtos/UserCreateRequest';
import { CreateUser } from '../application/use-cases/CreateUser';
import { UserCreateResponse } from '@app/user/presentation/dtos/UserCreateResponse';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  async create(@Body() userCreateRequest: UserCreateRequest): Promise<UserCreateResponse> {
    const user = await this.createUser.invoke(userCreateRequest);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateRequest } from './dtos/UserCreateRequest';
import { UserCreateResponse } from '@app/user/presentation/dtos/UserCreateResponse';
import { CreateUser } from '@app/user/domain/service/CreateUser';
import { UserLoginRequest } from '@app/user/presentation/dtos/UserLoginRequest';
import { LoginUser } from '@app/user/domain/service/LoginUser';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser, private loginUser: LoginUser) {}

  @Post()
  async create(@Body() userCreateRequest: UserCreateRequest): Promise<UserCreateResponse> {
    const user = await this.createUser.create(userCreateRequest);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  @Post('login')
  async login(@Body() userLoginRequest: UserLoginRequest): Promise<string> {
    return this.loginUser.login(userLoginRequest);
  }
}

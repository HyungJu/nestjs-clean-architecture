import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateRequest } from './dtos/UserCreateRequest';
import { CreateUser } from '../application/use-cases/CreateUser';
import { UserCreateResponse } from '@app/user/presentation/dtos/UserCreateResponse';
import { LoginUser } from '@app/user/application/use-cases/LoginUser';
import { UserLoginRequest } from '@app/user/presentation/dtos/UserLoginRequest';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser, private loginUser: LoginUser) {}

  @Post()
  async create(@Body() userCreateRequest: UserCreateRequest): Promise<UserCreateResponse> {
    const user = await this.createUser.invoke(userCreateRequest);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  @Post('login')
  async login(@Body() userLoginRequest: UserLoginRequest): Promise<string> {
    const token = await this.loginUser.invoke(userLoginRequest);
    return token;
  }
}

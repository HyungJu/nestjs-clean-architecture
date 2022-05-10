import { IsEmail, IsString } from 'class-validator';

export class UserCreateRequest {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  password!: string;
}

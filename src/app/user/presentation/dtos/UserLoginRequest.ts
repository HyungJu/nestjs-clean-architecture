import { IsEmail, IsString } from 'class-validator';

export class UserLoginRequest {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

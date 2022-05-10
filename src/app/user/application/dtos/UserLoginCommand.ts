import { IsEmail, IsString } from 'class-validator';

export class UserLoginCommand {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

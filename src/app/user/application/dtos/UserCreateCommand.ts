import { IsEmail, IsString } from 'class-validator';

export class UserCreateCommand {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  password!: string;
}

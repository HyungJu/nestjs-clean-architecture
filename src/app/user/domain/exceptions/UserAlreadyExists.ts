import { HttpException } from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  constructor() {
    super('User already exists', 404);
  }
}
import { HttpException } from '@nestjs/common';

export class WrongPassword extends HttpException {
  constructor() {
    super('User not found', 404);
  }
}

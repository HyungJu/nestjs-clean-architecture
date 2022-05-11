import { HttpException } from '@nestjs/common';

export class UserNotExists extends HttpException {
  constructor() {
    super('User does not exists', 404);
  }
}

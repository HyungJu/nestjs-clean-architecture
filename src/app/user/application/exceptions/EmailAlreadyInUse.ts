import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyInUse extends HttpException {
  constructor() {
    super('Email Already in Use', HttpStatus.BAD_REQUEST);
  }
}

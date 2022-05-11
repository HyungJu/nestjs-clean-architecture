import * as bcrypt from 'bcrypt';

export class Password {
  readonly password!: string;

  constructor(password: string) {
    this.password = password;
  }

  checkPassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.password);
  }

  toString(): string {
    return this.password;
  }
}

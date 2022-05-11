import * as bcrypt from 'bcrypt';
import { WrongPassword } from '@app/user/domain/exceptions/WrongPassword';

export class Password {
  readonly password!: string;

  constructor(password: string) {
    this.password = password;
  }

  async checkPassword(plain: string): Promise<boolean> {
    console.log(this.password, plain);
    const isPasswordMatches = await bcrypt.compare(plain, this.password);

    if (!isPasswordMatches) throw new WrongPassword();
    return true;
  }

  toString(): string {
    return this.password;
  }
}

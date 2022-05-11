import * as jwt from 'jsonwebtoken';
import { Password } from '@app/user/domain/password.entity';

export type UserProps = {
  id: string;
  email: string;
  password: Password;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class User {
  id!: string;
  email!: string;
  name!: string;
  password!: Password;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  withdraw(): void {
    this.deletedAt = new Date();
  }

  generateJwtToken(): string {
    return jwt.sign(
      {
        iat: new Date().getUTCSeconds(),
        sub: this.id,
      },
      'test',
    );
  }
}

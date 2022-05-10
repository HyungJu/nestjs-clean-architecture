import { User } from './user.entity';
import { UserCreateInput } from './dtos/UserCreateInput';

export interface UserRepository {
  create(data: UserCreateInput): Promise<User>;

  findUserByEmail(email: string): Promise<User | null>;
}

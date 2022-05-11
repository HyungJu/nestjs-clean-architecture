import { User } from './user.entity';
import { UserCreateInput } from './dtos/UserCreateInput';

export interface UserRepository {
  create(data: UserCreateInput): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;

  persist(user: User): Promise<User>;
}

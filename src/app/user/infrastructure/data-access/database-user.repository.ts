import { DatabaseService } from '@infrastructure/database/database.service';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { UserCreateInput } from '@app/user/domain/dtos/UserCreateInput';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private databaseService: DatabaseService) {}

  async persist(user: User): Promise<User> {
    const res = await this.databaseService.user.update({
      where: { id: user.id },
      data: user,
    });

    return new User(res);
  }

  async create(data: UserCreateInput): Promise<User> {
    const user = await this.databaseService.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });

    console.log(user);
    return new User(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.databaseService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return null;
    console.log(user);
    return new User(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.databaseService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) return null;
    console.log(user);
    return new User(user);
  }
}

import { DatabaseService } from '@infrastructure/database/database.service';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';
import { UserCreateInput } from '@app/user/domain/dtos/UserCreateInput';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(data: UserCreateInput): Promise<User> {
    const user = await this.databaseService.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });

    console.log(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.databaseService.user.findFirst({
      where: {
        email,
      },
    });

    console.log(user);
    return user;
  }
}

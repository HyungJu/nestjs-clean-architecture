import { DatabaseService } from '@infrastructure/database/database.service';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';
@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(data: { email: string; name: string }): Promise<User | null> {
    const user = await this.databaseService.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });

    console.log(user);
    return {
      email: user.email,
      id: +user.id,
      name: user.name
    };
  }
}

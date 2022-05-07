import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './data-access/database-user.repository';
import { TestUserCreator } from './use-cases/TestUserCreator';
import { UserController } from './user.controller';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserJoinEvent } from '@app/user/infrastructure/events/UserJoinEvent';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserJoinEvent,
    DatabaseUserRepository,
    TestUserCreator,
    { provide: 'UserRepository', useClass: DatabaseUserRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
  ],
  controllers: [UserController],
})
export class UserModule {}

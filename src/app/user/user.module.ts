import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './infrastructure/data-access/database-user.repository';
import { CreateUser } from './application/use-cases/CreateUser';
import { UserController } from './presentation/user.controller';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserJoinEvent } from '@app/user/infrastructure/events/UserJoinEvent';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserJoinEvent,
    DatabaseUserRepository,
    CreateUser,
    { provide: 'UserRepository', useClass: DatabaseUserRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
  ],
  controllers: [UserController],
})
export class UserModule {}

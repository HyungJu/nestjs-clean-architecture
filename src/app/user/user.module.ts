import { DatabaseModule } from '../../core/infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './infrastructure/data-access/database-user.repository';
import { UserController } from './presentation/user.controller';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserJoinEvent } from '@app/user/infrastructure/events/UserJoinEvent';
import { WithdrawUser } from '@app/user/domain/service/WithdrawUser';
import { USER } from '@app/user/user.provider';
import { APP } from '@app/app.provider';
import { CreateUser } from '@app/user/domain/service/CreateUser';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserJoinEvent,
    DatabaseUserRepository,
    WithdrawUser,
    CreateUser,
    { provide: USER.USER_REPOSITORY, useClass: DatabaseUserRepository },
    { provide: APP.EVENT_EMITTER, useExisting: EventEmitter2 },
  ],
  controllers: [UserController],
})
export class UserModule {}

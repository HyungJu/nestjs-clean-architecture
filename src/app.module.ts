import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from '@app/user/user.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [ConfigModule.forRoot(), EventEmitterModule.forRoot(), DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from '@app/user/user.module';
import { DatabaseModule } from './app/core/infrastructure/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CoreModule } from './app/core/core.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), EventEmitterModule.forRoot(), DatabaseModule, UserModule, CoreModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

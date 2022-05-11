import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtConstants } from '@app/auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

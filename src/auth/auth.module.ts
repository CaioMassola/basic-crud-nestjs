import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './settings/local.strategy';
import { JwtStrategy } from './settings/jwt.strategy';
import { AuthService } from './auth.service';

import { jwtConstants } from './settings/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

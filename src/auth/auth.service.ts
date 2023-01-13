import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.getByEmail(userEmail);
    if (user && user.password === userPassword) {
      return user;
    }

    return null;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const token = await this.jwtService.sign({
          id: user.id,
          username: user.username,
          email: user.email,
        });
        return {
          message: 'Successfully logged in!',
          access_token: token,
          type: 'Bearer',
          status: 201,
        };
      }
    }
    return null;
  }
}

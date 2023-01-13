import { AuthService } from './auth.service';
import { LocalAuthGuard } from './settings/local-auth.guard';
import { Controller, UseGuards, Post } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { Res } from '@nestjs/common/decorators';

type IToken = {
  message: string;
  access_token: string;
  type: string;
  status: number;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request, @Res() response: Response) {
    const { email, password } = request.body;
    const dataToken = await this.authService.login(email, password);

    if (dataToken) {
      return response.status(201).send({ message: dataToken });
    }
    return response
      .status(200)
      .send({ message: 'Invalid email or password!', status: 200 });
  }
}

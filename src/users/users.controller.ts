import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const data = await this.usersService.create(createUserDto);
      return response.status(201).send({
        message: 'User registered successfully!',
        user: data,
        status: 201,
      });
    } catch (e) {
      return response.status(500).send({
        message: 'Error registering user!',
        error: e.message,
        status: 500,
      });
    }
  }

  @Get('list')
  async findAll(@Res() response: Response) {
    try {
      const data = await this.usersService.findAll();
      return response.status(200).send({
        message: 'Users list!',
        users: data.length ? data : 'No result',
        status: 200,
      });
    } catch (e) {
      return response.status(500).send({
        message: e.message,
      });
    }
  }

  @Get('list/:id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const data = await this.usersService.findOne(+id);
      if (data) {
        return response.status(200).send({
          message: 'User data!',
          user: data,
          status: 200,
        });
      } else {
        return response.status(200).send({
          message: 'No users found!',
          status: 200,
        });
      }
    } catch (e) {
      return response.status(500).send({
        message: 'Error listing user!',
        error: e.message,
        status: 500,
      });
    }
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    try {
      const data = await this.usersService.findOne(+id);
      if (data) {
        await this.usersService.update(updateUserDto, data);
        return response.status(201).send({
          message: 'User successfully updated!',
          user: data,
          status: 201,
        });
      } else {
        return response.status(200).send({
          message: 'No user found!',
          status: 200,
        });
      }
    } catch (e) {
      if (e.code === 'ER_BAD_FIELD_ERROR') {
        return response.status(500).send({
          message: 'Error update user!',
          error: e.message,
          status: 500,
        });
      }
      if (e.code === 'ER_DUP_ENTRY') {
        return response.status(500).send({
          message: 'There is already a user with this data!',
          error: e.message,
          status: 500,
        });
      }
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const data = await this.usersService.findOne(+id);
      if (data) {
        await this.usersService.remove(id);
        return response.status(200).send({
          message: 'User successfully deleted!',
          status: 200,
        });
      } else {
        return response.status(200).send({
          message: 'No user found!',
          status: 200,
        });
      }
    } catch (e) {
      return response.status(500).send({
        message: 'Error delete user!',
        error: e.message,
        status: 500,
      });
    }
  }
}

import { Body, Controller, Post, UseInterceptors, Get, Param } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from '../generated/nestjs-dto/create-user.dto';

// @UseInterceptors(TransformInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('verify/:confirm_code')
  async verifyUser(@Param('confirm_code') confirm_code: string) {
    return this.userService.verifyEmail(confirm_code);
  }
}

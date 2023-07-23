import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("User")
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get("/get-user")
  getUser(@Headers("Authorization") token: string) {
    return this.userService.getUserByToken(token);
  }
}

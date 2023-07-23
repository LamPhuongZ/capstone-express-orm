import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@UseGuards(AuthGuard("jwt"))
@ApiTags("User")
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  @Get("/get-user")
  getUser(@Headers("Authorization") token: string) {
    // try {
    //   if (this.jwtService.verify(token)) {
    return this.userService.getUserByToken(token)
    //   }
    //   else {
    //     throw new HttpException("Unauthorized", 401);
    //   }
    // } catch (error) {
    //   throw new HttpException(error.response, error.status);

    // }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("User")
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get("/get-user")
  getUser(@Headers("Authorization") token: string, @Res() res: Response) {
    return this.userService.getUserByToken(token, res);
  }
}

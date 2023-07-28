import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  prisma = new PrismaClient();

  // login
  async login(userLogin: AuthDto, res: Response) {
    try {

      let checkUser = await this.prisma.tblUser.findFirst({
        where: {
          email: userLogin.email
        }
      });

      if (checkUser) {
        if (bcrypt.compareSync(userLogin.pass_word, checkUser.pass_word) || userLogin.pass_word == checkUser.pass_word) {
          checkUser = { ...checkUser, pass_word: '' };

          let token = await this.jwtService.signAsync(
            { user_id: checkUser.user_id },
            { secret: this.configService.get("KEY"), expiresIn: "1d" }
          );

          const data = { user: checkUser, token: token }
          return res.status(200).json({
            status: "200",
            message: "Đăng nhập thành công.",
            data
          });
        } else {
          return res.status(400).json({
            status: "400",
            message: "Mật khẩu không hợp lệ !!!"
          });
        }
      } else {
        return res.status(400).json({
          status: "400",
          message: "Email không hợp lệ !!!"
        });
      }
    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }

  }
}
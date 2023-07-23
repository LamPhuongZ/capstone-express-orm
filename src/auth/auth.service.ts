import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  prisma = new PrismaClient();

  // login
  async login(userLogin: AuthDto) {
    try {

      let checkUser = await this.prisma.tblUser.findFirst({
        where: {
          email: userLogin.email
        }
      });

      if (checkUser) {
        if (bcrypt.compareSync(userLogin.pass_word, checkUser.pass_word) || userLogin.pass_word == checkUser.pass_word) {
          checkUser = { ...checkUser, pass_word: '' };

          let token = this.jwtService.signAsync(
            { user_id: checkUser.user_id },
            { secret: this.configService.get("KEY"), expiresIn: "1d" }
          );
          return token;
          // throw new HttpException("Đăng nhập thành công", 200);
        } else {
          throw new HttpException("Mật khẩu không hợp lệ !!!", 400);
        }
      } else {
        throw new HttpException("Email không hợp lệ !!!", 400);
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }

  }
}
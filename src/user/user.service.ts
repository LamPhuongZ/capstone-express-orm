import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, tblUser } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) { }

  prisma = new PrismaClient();

  async getUserByToken(token: string) {
    try {
      let data = this.prisma.tblUser.findMany()
      return data;

    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}

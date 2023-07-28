import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, tblUser } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) { }

  prisma = new PrismaClient();

  // Lấy thông tin user theo token
  async getUserByToken(token: string, res: Response) {
    try {
      // lấy phần chuỗi sau Bearer trừ luôn khoảng cách (SOF)
      let payload: tblUser | any = this.jwtService.decode(
        token.split(" ")[1]
      );

      const data = await this.prisma.tblUser.findFirst({
        where: {
          user_id: payload.user_id
        },
      });

      return res.status(200).json({
        status: "200",
        message: "Lấy dữ liệu thành công",
        data
      });

    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { ImageDto } from './dto/image.dto';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class ImageService {

  prisma = new PrismaClient();

  // Lấy danh sách hình ảnh
  async getImage(): Promise<ImageDto[]> {
    try {
      let data = await this.prisma.tblImage.findMany();
      return data;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  // Lấy danh sách ảnh đã tạo theo userId
  async getCreatedImageByUserId(userId: number, res: Response) {
    try {
      let data = await this.prisma.tblImage.findMany({
        where: {
          user_id: Number(userId)
        }
      })

      if (data.length > 0) {
        return res.status(200).json({
          status: "200",
          message: "Lấy dữ liệu thành công",
          data
        });

      } else {
        return res.status(404).json({
          status: "404",
          message: "Dữ liệu không tồn tại !!!"
        });
      }
    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }
  }

  // Lấy thông tin ảnh và người tạo ảnh bằng imageId
  async getInfoImageByImageId(imageId: number, res: Response) {
    try {
      let data = await this.prisma.tblImage.findFirst({
        include: {
          tblUser: true
        },
        where: {
          image_id: Number(imageId)
        }
      });

      if (data) {
        const { tblUser, ...mData } = data;

        return res.status(200).json({
          status: "200",
          message: "Lấy dữ liệu thành công",
          data
        });

      } else {
        return res.status(404).json({
          status: "404",
          message: "Dữ liệu không tồn tại !!!"
        });
      }

    } catch (error) {
      throw new HttpException(error.response.message, error.status);
    }
  }

}

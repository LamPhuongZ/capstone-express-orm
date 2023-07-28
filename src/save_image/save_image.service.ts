import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class SaveImageService {
  prisma = new PrismaClient();

  // Lấy thông tin đã lưu hình này theo imageId ( dùng để kiểm tra ảnh đã lưu hay chưa ở nút save)
  async getCheckSavedImage(imageId: number, userId: number, res: Response) {
    try {
      // Kiểm tra imageId có tồn tại hay chưa
      let checkImageId = await this.prisma.tblImage.findFirst({
        where: {
          image_id: Number(imageId)
        }
      })

      if (checkImageId) {
        // Nếu tồn tại thì kiểm tra ở bảng save_image xem có dữ liệu không
        let saveImage = await this.prisma.tblSaveImage.findMany({
          where: {
            image_id: Number(imageId),
            user_id: Number(userId)
          }
        });

        return res.status(200).json({
          status: "200",
          message: "Lấy dữ liệu thành công",
          saveImage
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

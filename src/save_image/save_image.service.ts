import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, tblUser } from '@prisma/client';


@Injectable()
export class SaveImageService {
  constructor(private jwtService: JwtService) { }

  prisma = new PrismaClient();

  // Lấy thông tin đã lưu hình này theo imageId ( dùng để kiểm tra ảnh đã lưu hay chưa ở nút save)
  async getCheckSavedImage(imageId: number, userId: number) {
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
        })
        return saveImage;
      } else {
        throw new HttpException("Dữ liệu không tồn tại", 404);
      }

    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}

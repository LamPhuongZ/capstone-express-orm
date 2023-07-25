import { HttpException, Injectable } from '@nestjs/common';
import { ImageDto } from './dto/image.dto';
import { PrismaClient } from '@prisma/client';

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
  async getCreatedImageByUserId(userId: string): Promise<ImageDto[]> {
    try {
      let data = await this.prisma.tblImage.findMany({
        where: {
          user_id: Number(userId)
        }
      })

      if (data.length > 0) {
        return data;
      } else {
        throw new HttpException("Dữ liệu không tồn tại", 404);
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}

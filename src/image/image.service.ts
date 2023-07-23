import { HttpException, Injectable } from '@nestjs/common';
import { ImageDto } from './dto/image.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ImageService {

  prisma = new PrismaClient();

  // Lấy danh sách hình ảnh
  async getImage(): Promise<ImageDto[]> {
    try {
      let data = this.prisma.tblImage.findMany();
      return data;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}

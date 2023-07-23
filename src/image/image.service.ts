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
  async getImageByUserId(): Promise<any> {
    try {
      
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}

import { Injectable, HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class SaveImageService {
  prisma = new PrismaClient();

  // Lấy thông tin đã lưu hình này theo imageId ( dùng để kiểm tra ảnh đã lưu hay chưa ở nút save)
 
}

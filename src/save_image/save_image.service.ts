import { Injectable } from '@nestjs/common';
import { CreateSaveImageDto } from './dto/create-save_image.dto';
import { UpdateSaveImageDto } from './dto/update-save_image.dto';

@Injectable()
export class SaveImageService {
  create(createSaveImageDto: CreateSaveImageDto) {
    return 'This action adds a new saveImage';
  }

  findAll() {
    return `This action returns all saveImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saveImage`;
  }

  update(id: number, updateSaveImageDto: UpdateSaveImageDto) {
    return `This action updates a #${id} saveImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} saveImage`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaveImageService } from './save_image.service';
import { CreateSaveImageDto } from './dto/create-save_image.dto';
import { UpdateSaveImageDto } from './dto/update-save_image.dto';

@Controller('save-image')
export class SaveImageController {
  constructor(private readonly saveImageService: SaveImageService) {}

  @Post()
  create(@Body() createSaveImageDto: CreateSaveImageDto) {
    return this.saveImageService.create(createSaveImageDto);
  }

  @Get()
  findAll() {
    return this.saveImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saveImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaveImageDto: UpdateSaveImageDto) {
    return this.saveImageService.update(+id, updateSaveImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saveImageService.remove(+id);
  }
}

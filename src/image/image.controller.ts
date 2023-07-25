import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ImageDto } from './dto/image.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags("Image")
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Get("/get-image")
  getImage(): Promise<ImageDto[]> {
    return this.imageService.getImage();
  }

  @Get("/get-image-by-userId/:userId")
  getCreatedImageByUserId(@Param("userId") userId: string): Promise<ImageDto[]> {
    return this.imageService.getCreatedImageByUserId(userId);
  }
}

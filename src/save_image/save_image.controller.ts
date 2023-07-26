import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { SaveImageService } from './save_image.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("Save-image")
@Controller('save-image')
export class SaveImageController {
  constructor(private readonly saveImageService: SaveImageService) { }

  @Get("/:imageId/:userId")
  getCheckSavedImage(@Param("imageId") imageId: number, @Param("userId") userId: number) {
    return this.saveImageService.getCheckSavedImage(imageId, userId)
  }

}

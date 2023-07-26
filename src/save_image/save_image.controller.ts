import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SaveImageService } from './save_image.service';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard("jwt"))
@Controller('save-image')
export class SaveImageController {
  constructor(private readonly saveImageService: SaveImageService) { }


}

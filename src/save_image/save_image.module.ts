import { Module } from '@nestjs/common';
import { SaveImageService } from './save_image.service';
import { SaveImageController } from './save_image.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SaveImageController],
  providers: [SaveImageService]
})
export class SaveImageModule { }

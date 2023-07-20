import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ImageModule } from './image/image.module';
import { SaveImageModule } from './save_image/save_image.module';

@Module({
  imports: [AuthModule, UserModule, CommentModule, ImageModule, SaveImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

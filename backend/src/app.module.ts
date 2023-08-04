import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(config), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

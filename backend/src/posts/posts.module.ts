import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POST } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([POST])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

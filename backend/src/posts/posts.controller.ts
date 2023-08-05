import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { POST } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<POST[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<POST> {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() post: POST): Promise<POST> {
    return this.postsService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() post: POST): Promise<POST> {
    return this.postsService.update(id, post);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POST } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(POST)
    private postsRepository: Repository<POST>,
  ) {}

  async findAll(): Promise<POST[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<POST> {
    return this.postsRepository.findOne({ where: { id: id } });
  }
}

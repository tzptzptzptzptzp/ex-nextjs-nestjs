import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POST } from './post.entity';
import { NotFoundException } from 'src/notFound.exception';

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
    const data = await this.postsRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return data;
  }

  async create(post: POST): Promise<POST> {
    return this.postsRepository.save(post);
  }

  async update(id: number, post: POST): Promise<POST> {
    await this.postsRepository.update(id, post);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}

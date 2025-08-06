import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = new Post();
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.content = createPostDto.content;
    post.isPublic = createPostDto.isPublic;

    const createdPost = await this.postsRepository.save(post);

    return createdPost;
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException();
    }

    post.title = updatePostDto.title ?? post.title;
    post.description = updatePostDto.description ?? post.description;
    post.content = updatePostDto.content ?? post.content;
    post.isPublic = updatePostDto.isPublic ?? post.isPublic;

    const updatedPost = await this.postsRepository.save(post);

    return updatedPost;
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException();
    }

    const deletedPost = await this.postsRepository.remove(post);
    return deletedPost;
  }
}

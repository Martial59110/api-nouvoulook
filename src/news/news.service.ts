import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto, userId: string): Promise<News> {
    return this.prisma.news.create({
      data: {
        ...createNewsDto,
        userId,
      },
    });
  }

  async findAll(): Promise<News[]> {
    return this.prisma.news.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<News> {
    const news = await this.prisma.news.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id);
    
    return this.prisma.news.update({
      where: { id },
      data: updateNewsDto,
      include: {
        user: true,
      },
    });
  }

  async remove(id: string): Promise<News> {
    const news = await this.findOne(id);
    
    return this.prisma.news.delete({
      where: { id },
      include: {
        user: true,
      },
    });
  }
} 
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClothingExampleDto } from './dto/create-clothing-example.dto';
import { UpdateClothingExampleDto } from './dto/update-clothing-example.dto';
import { ClothingExample } from './entities/clothing-example.entity';

@Injectable()
export class ClothingExamplesService {
  constructor(private prisma: PrismaService) {}

  async create(createClothingExampleDto: CreateClothingExampleDto, userId: string): Promise<ClothingExample> {
    return this.prisma.clothingExample.create({
      data: {
        ...createClothingExampleDto,
        userId,
      },
    });
  }

  async findAll(): Promise<ClothingExample[]> {
    return this.prisma.clothingExample.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<ClothingExample> {
    const clothingExample = await this.prisma.clothingExample.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!clothingExample) {
      throw new NotFoundException(`Clothing example with ID ${id} not found`);
    }

    return clothingExample;
  }

  async update(id: string, updateClothingExampleDto: UpdateClothingExampleDto): Promise<ClothingExample> {
    const clothingExample = await this.findOne(id);
    
    return this.prisma.clothingExample.update({
      where: { id },
      data: updateClothingExampleDto,
      include: {
        user: true,
      },
    });
  }

  async remove(id: string): Promise<ClothingExample> {
    const clothingExample = await this.findOne(id);
    
    return this.prisma.clothingExample.delete({
      where: { id },
      include: {
        user: true,
      },
    });
  }
} 
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from './entities/partner.entity';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto, userId: string): Promise<Partner> {
    return this.prisma.partner.create({
      data: {
        ...createPartnerDto,
        userId,
      },
    });
  }

  async findAll(): Promise<Partner[]> {
    return this.prisma.partner.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.prisma.partner.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    return partner;
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto): Promise<Partner> {
    const partner = await this.findOne(id);
    
    return this.prisma.partner.update({
      where: { id },
      data: updatePartnerDto,
      include: {
        user: true,
      },
    });
  }

  async remove(id: string): Promise<Partner> {
    const partner = await this.findOne(id);
    
    return this.prisma.partner.delete({
      where: { id },
      include: {
        user: true,
      },
    });
  }
} 
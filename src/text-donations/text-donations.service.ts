import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTextDonationDto } from './dto/create-text-donation.dto';
import { UpdateTextDonationDto } from './dto/update-text-donation.dto';
import { TextDonation } from './entities/text-donation.entity';

@Injectable()
export class TextDonationsService {
  constructor(private prisma: PrismaService) {}

  async create(createTextDonationDto: CreateTextDonationDto, userId: string): Promise<TextDonation> {
    return this.prisma.textDonation.create({
      data: {
        ...createTextDonationDto,
        userId,
      },
    });
  }

  async findAll(): Promise<TextDonation[]> {
    return this.prisma.textDonation.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<TextDonation> {
    const textDonation = await this.prisma.textDonation.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!textDonation) {
      throw new NotFoundException(`Text donation with ID ${id} not found`);
    }

    return textDonation;
  }

  async update(id: string, updateTextDonationDto: UpdateTextDonationDto): Promise<TextDonation> {
    const textDonation = await this.findOne(id);
    
    return this.prisma.textDonation.update({
      where: { id },
      data: updateTextDonationDto,
      include: {
        user: true,
      },
    });
  }

  async remove(id: string): Promise<TextDonation> {
    const textDonation = await this.findOne(id);
    
    return this.prisma.textDonation.delete({
      where: { id },
      include: {
        user: true,
      },
    });
  }
} 
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTextDonationDto } from './dto/create-text-donation.dto';
import { UpdateTextDonationDto } from './dto/update-text-donation.dto';
import { TextDonation } from './entities/text-donation.entity';
import { Logger } from 'nestjs-pino';

@Injectable()
export class TextDonationsService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: Logger
  ) {}

  async create(createTextDonationDto: CreateTextDonationDto, userId: string): Promise<TextDonation> {
    this.logger.info('Creating new text donation', { userId, ...createTextDonationDto });
    const donation = await this.prisma.textDonation.create({
      data: {
        ...createTextDonationDto,
        userId,
      },
    });
    this.logger.info('Text donation created successfully', { id: donation.id });
    return donation;
  }

  async findAll(): Promise<TextDonation[]> {
    this.logger.info('Fetching all text donations');
    const donations = await this.prisma.textDonation.findMany({
      include: {
        user: true,
      },
    });
    this.logger.info(`Found ${donations.length} text donations`);
    return donations;
  }

  async findOne(id: string): Promise<TextDonation> {
    this.logger.info('Fetching text donation by id', { id });
    const textDonation = await this.prisma.textDonation.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!textDonation) {
      this.logger.warn('Text donation not found', { id });
      throw new NotFoundException(`Text donation with ID ${id} not found`);
    }

    this.logger.info('Text donation found successfully', { id });
    return textDonation;
  }

  async update(id: string, updateTextDonationDto: UpdateTextDonationDto): Promise<TextDonation> {
    this.logger.info('Updating text donation', { id, ...updateTextDonationDto });
    await this.findOne(id);
    
    const updated = await this.prisma.textDonation.update({
      where: { id },
      data: updateTextDonationDto,
      include: {
        user: true,
      },
    });
    this.logger.info('Text donation updated successfully', { id });
    return updated;
  }

  async remove(id: string): Promise<TextDonation> {
    this.logger.info('Removing text donation', { id });
    await this.findOne(id);
    
    const deleted = await this.prisma.textDonation.delete({
      where: { id },
      include: {
        user: true,
      },
    });
    this.logger.info('Text donation deleted successfully', { id });
    return deleted;
  }
} 
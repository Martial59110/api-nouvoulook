import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: PinoLogger
  ) {
    logger.setContext('UsersService');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.info('Creating new user', { email: createUserDto.email });

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      this.logger.warn('User already exists', { email: createUserDto.email });
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        roles: [Role.ADMIN],
      },
    });

    this.logger.info('User created successfully', { id: user.id });
    return user;
  }

  async findAll(): Promise<User[]> {
    this.logger.info('Fetching all users');
    const users = await this.prisma.user.findMany({
      include: {
        partner: true,
        news: true,
        textDonations: true,
        textVolunteer: true,
        clothingExamples: true,
      },
    });
    this.logger.info(`Found ${users.length} users`);
    return users;
  }

  async findOne(id: string): Promise<User> {
    this.logger.info('Fetching user by id', { id });
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        partner: true,
        news: true,
        textDonations: true,
        textVolunteer: true,
        clothingExamples: true,
      },
    });

    if (!user) {
      this.logger.warn('User not found', { id });
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.logger.info('User found successfully', { id });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.info('Fetching user by email');
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.info('Updating user', { id });
    await this.findOne(id);

    // If password is being updated, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        partner: true,
        news: true,
        textDonations: true,
        textVolunteer: true,
        clothingExamples: true,
      },
    });

    this.logger.info('User updated successfully', { id });
    return updated;
  }

  async remove(id: string): Promise<User> {
    this.logger.info('Removing user', { id });
    await this.findOne(id);

    const deleted = await this.prisma.user.delete({
      where: { id },
      include: {
        partner: true,
        news: true,
        textDonations: true,
        textVolunteer: true,
        clothingExamples: true,
      },
    });

    this.logger.info('User deleted successfully', { id });
    return deleted;
  }
} 
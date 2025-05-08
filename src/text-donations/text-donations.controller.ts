import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TextDonationsService } from './text-donations.service';
import { CreateTextDonationDto } from './dto/create-text-donation.dto';
import { UpdateTextDonationDto } from './dto/update-text-donation.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../auth/enums/role.enum';
@Controller('text-donations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TextDonationsController {
  constructor(private readonly textDonationsService: TextDonationsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  create(@Body() createTextDonationDto: CreateTextDonationDto, @Req() req) {
    return this.textDonationsService.create(createTextDonationDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.textDonationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textDonationsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateTextDonationDto: UpdateTextDonationDto) {
    return this.textDonationsService.update(id, updateTextDonationDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.textDonationsService.remove(id);
  }
} 
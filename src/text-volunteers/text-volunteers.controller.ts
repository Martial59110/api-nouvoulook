import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TextVolunteersService } from './text-volunteers.service';
import { CreateTextVolunteerDto } from './dto/create-text-volunteer.dto';
import { UpdateTextVolunteerDto } from './dto/update-text-volunteer.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TextVolunteer } from './entities/text-volunteer.entity';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('text-volunteers')
@UseGuards(JwtAuthGuard)
export class TextVolunteersController {
  constructor(private readonly textVolunteersService: TextVolunteersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  create(
    @Body() createTextVolunteerDto: CreateTextVolunteerDto,
    @Request() req,
  ): Promise<TextVolunteer> {
    return this.textVolunteersService.create(createTextVolunteerDto, req.user.id);
  }

  @Get()
  findAll(): Promise<TextVolunteer[]> {
    return this.textVolunteersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TextVolunteer> {
    return this.textVolunteersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateTextVolunteerDto: UpdateTextVolunteerDto,
  ): Promise<TextVolunteer> {
    return this.textVolunteersService.update(id, updateTextVolunteerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string): Promise<TextVolunteer> {
    return this.textVolunteersService.remove(id);
  }
} 
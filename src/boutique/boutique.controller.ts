import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { CreateBoutiqueDto } from './dto/create-boutique.dto';
import { UpdateBoutiqueDto } from './dto/update-boutique.dto';
import { Public } from '../decorators/public.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('boutique')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BoutiqueController {
  constructor(private readonly boutiqueService: BoutiqueService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  create(@Body() dto: CreateBoutiqueDto) {
    return this.boutiqueService.create(dto);
  }

  @Get()
  @Public()
  findAll() {
    return this.boutiqueService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.boutiqueService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  update(@Param('id') id: string, @Body() dto: UpdateBoutiqueDto) {
    return this.boutiqueService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  remove(@Param('id') id: string) {
    return this.boutiqueService.remove(id);
  }
} 
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { BarberosService } from './barberos.service';

import { CreateBarberoDto } from './dto/create-barbero.dto';
import { UpdateBarberoDto } from './dto/update-barbero.dto';

@Controller('barberos')
export class BarberosController {

  constructor(
    private readonly barberosService: BarberosService,
  ) {}

  @Post()
  create(@Body() dto: CreateBarberoDto) {
    return this.barberosService.create(dto);
  }

  @Get()
  findAll() {
    return this.barberosService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.barberosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBarberoDto,
  ) {
    return this.barberosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.barberosService.remove(id);
  }
}
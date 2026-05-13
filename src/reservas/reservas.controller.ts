import {Body,Controller,Delete,Get,HttpCode,Param,ParseIntPipe,Patch,Post,
} from '@nestjs/common';

import { ReservasService } from './reservas.service';

import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('reservas')
export class ReservasController {

  constructor(
    private readonly reservasService: ReservasService,
  ) {}

  @Post()
  create(@Body() dto: CreateReservaDto) {
    return this.reservasService.create(dto);
  }

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservaDto,
  ) {
    return this.reservasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservasService.remove(id);
  }
}
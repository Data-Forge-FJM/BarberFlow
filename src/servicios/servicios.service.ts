import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Injectable()
export class ServiciosService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateServicioDto) {

    return this.prisma.servicio.create({
      data: {
        nombre: dto.nombre,
        duracion: dto.duracion,
        precio: dto.precio,
        descripcion: dto.descripcion,
      },
    });
  }

  async findAll() {

    return this.prisma.servicio.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {

    const servicio =
      await this.prisma.servicio.findUnique({
        where: { id },
      });

    if (!servicio) {
      throw new NotFoundException(
        `Servicio ${id} no existe`,
      );
    }

    return servicio;
  }

  async update(
    id: number,
    dto: UpdateServicioDto,
  ) {

    await this.findOne(id);

    return this.prisma.servicio.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.servicio.delete({
      where: { id },
    });
  }
}
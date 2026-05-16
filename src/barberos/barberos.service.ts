import {
  BadRequestException,Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateBarberoDto } from './dto/create-barbero.dto';
import { UpdateBarberoDto } from './dto/update-barbero.dto';

@Injectable()
export class BarberosService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(dto: CreateBarberoDto) {

    const existeBarbero =
      await this.prisma.barbero.findUnique({
        where: {
          telefono: dto.telefono!,
        },
      });

    if (existeBarbero) {
      throw new BadRequestException(
        'Ya existe un barbero con ese teléfono',
      );
    }

    return this.prisma.barbero.create({
      data: {
        nombre: dto.nombre,
        especialidad: dto.especialidad,
        telefono: dto.telefono!,
        disponible: dto.disponible,
      },
    });
  }

  async findAll() {

    return this.prisma.barbero.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {

    const barbero =
      await this.prisma.barbero.findUnique({
        where: { id },
      });

    if (!barbero) {
      throw new NotFoundException(
        `Barbero ${id} no existe`,
      );
    }

    return barbero;
  }

  async update(
    id: number,
    dto: UpdateBarberoDto,
  ) {

    await this.findOne(id);

    return this.prisma.barbero.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.barbero.delete({
      where: { id },
    });
  }
}
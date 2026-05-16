import {
  Injectable,
  NotFoundException,BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Injectable()
export class HorariosService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

async create(dto: CreateHorarioDto) {

  const existeHorario =
    await this.prisma.horario.findFirst({
      where: {
        barberoId: dto.barberoId,
        dia: dto.dia,
        horaInicio: dto.horaInicio,
        horaFin: dto.horaFin,
      },
    });

  if (existeHorario) {
    throw new BadRequestException(
      'Ese horario ya existe para el barbero',
    );
  }

  return this.prisma.horario.create({
    data: {
      dia: dto.dia,
      horaInicio: dto.horaInicio,
      horaFin: dto.horaFin,
      disponible: dto.disponible,
      barberoId: dto.barberoId,
    },
  });
}

  async findAll() {

    return this.prisma.horario.findMany({
      include: {
        barbero: true,
      },

      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {

    const horario =
      await this.prisma.horario.findUnique({
        where: { id },

        include: {
          barbero: true,
        },
      });

    if (!horario) {
      throw new NotFoundException(
        `Horario ${id} no existe`,
      );
    }

    return horario;
  }

  async update(
    id: number,
    dto: UpdateHorarioDto,
  ) {

    await this.findOne(id);

    return this.prisma.horario.update({
      where: { id },

      data: dto,
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.horario.delete({
      where: { id },
    });
  }
}
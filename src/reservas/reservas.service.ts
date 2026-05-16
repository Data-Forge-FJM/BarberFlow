import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservasService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateReservaDto) {

    // BUSCAR HORARIO DEL BARBERO

const horario =
  await this.prisma.horario.findFirst({
    where: {
      barberoId: dto.barberoId,
      dia: dto.dia,
      disponible: true,
    },
  });

if (!horario) {
  throw new BadRequestException(
    'El barbero no tiene horarios configurados',
  );
}

// VALIDAR HORA DENTRO DEL RANGO

if (
  dto.hora < horario.horaInicio ||
  dto.hora > horario.horaFin
) {
  throw new BadRequestException(
    'La hora está fuera del horario del barbero',
  );
}

    // VALIDAR RESERVA DUPLICADA

    const existeReserva =
      await this.prisma.reserva.findFirst({
        where: {
          barberoId: dto.barberoId,
          fecha: dto.fecha,
          hora: dto.hora,
        },
      });

    if (existeReserva) {
      throw new BadRequestException(
        'El barbero ya tiene una reserva en ese horario',
      );
    }

    return this.prisma.reserva.create({
      data: {
        fecha: dto.fecha,
        hora: dto.hora,
        estado: dto.estado,

        clienteId: dto.clienteId,
        servicioId: dto.servicioId,
        barberoId: dto.barberoId,
      },
    });
  }

  async findAll() {

    return this.prisma.reserva.findMany({

      include: {
        cliente: true,
        servicio: true,
        barbero: true,
      },

      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {

    const reserva =
      await this.prisma.reserva.findUnique({

        where: { id },

        include: {
          cliente: true,
          servicio: true,
          barbero: true,
        },
      });

    if (!reserva) {
      throw new NotFoundException(
        `Reserva ${id} no existe`,
      );
    }

    return reserva;
  }

  async update(
    id: number,
    dto: UpdateReservaDto,
  ) {

    await this.findOne(id);

    return this.prisma.reserva.update({
      where: { id },

      data: dto,
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.reserva.delete({
      where: { id },
    });
  }
}
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservasService {

  private reservas: Reserva[] = [];
  private nextId = 1;

  create(dto: CreateReservaDto): Reserva {

    // VALIDAR RESERVA DUPLICADA
    const existeReserva = this.reservas.find(
      r =>
        r.barberoId === dto.barberoId &&
        r.fecha === dto.fecha &&
        r.hora === dto.hora,
    );

    if (existeReserva) {
      throw new BadRequestException(
        'El barbero ya tiene una reserva en ese horario',
      );
    }

    const nuevaReserva: Reserva = {
      id: this.nextId++,
      clienteId: dto.clienteId,
      servicioId: dto.servicioId,
      barberoId: dto.barberoId,
      fecha: dto.fecha,
      hora: dto.hora,
      estado: dto.estado,
      createdAt: new Date().toISOString(),
    };

    this.reservas.push(nuevaReserva);

    return nuevaReserva;
  }

  findAll(): Reserva[] {
    return this.reservas;
  }

  findOne(id: number): Reserva {

    const reserva = this.reservas.find(
      r => r.id === id,
    );

    if (!reserva) {
      throw new NotFoundException(
        `Reserva ${id} no existe`,
      );
    }

    return reserva;
  }

  update(
    id: number,
    dto: UpdateReservaDto,
  ): Reserva {

    const reserva = this.findOne(id);

    Object.assign(reserva, dto);

    return reserva;
  }

  remove(id: number): void {

    const index = this.reservas.findIndex(
      r => r.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(
        `Reserva ${id} no existe`,
      );
    }

    this.reservas.splice(index, 1);
  }
}
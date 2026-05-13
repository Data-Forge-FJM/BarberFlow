import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

import { Horario } from './entities/horario.entity';

@Injectable()
export class HorariosService {

  private horarios: Horario[] = [];
  private nextId = 1;

  create(dto: CreateHorarioDto): Horario {

    const nuevoHorario: Horario = {
      id: this.nextId++,
      barberoId: dto.barberoId,
      dia: dto.dia,
      horaInicio: dto.horaInicio,
      horaFin: dto.horaFin,
      disponible: dto.disponible,
      createdAt: new Date().toISOString(),
    };

    this.horarios.push(nuevoHorario);

    return nuevoHorario;
  }

  findAll(): Horario[] {
    return this.horarios;
  }

  findOne(id: number): Horario {

    const horario = this.horarios.find(
      h => h.id === id,
    );

    if (!horario) {
      throw new NotFoundException(
        `Horario ${id} no existe`,
      );
    }

    return horario;
  }

  update(
    id: number,
    dto: UpdateHorarioDto,
  ): Horario {

    const horario = this.findOne(id);

    Object.assign(horario, dto);

    return horario;
  }

  remove(id: number): void {

    const index = this.horarios.findIndex(
      h => h.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(
        `Horario ${id} no existe`,
      );
    }

    this.horarios.splice(index, 1);
  }
}
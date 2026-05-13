import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBarberoDto } from './dto/create-barbero.dto';
import { UpdateBarberoDto } from './dto/update-barbero.dto';

import { Barbero } from './entities/barbero.entity';

@Injectable()
export class BarberosService {

  private barberos: Barbero[] = [];
  private nextId = 1;

  create(dto: CreateBarberoDto): Barbero {

    const nuevoBarbero: Barbero = {
      id: this.nextId++,
      nombre: dto.nombre,
      especialidad: dto.especialidad,
      telefono: dto.telefono,
      disponible: dto.disponible,
      createdAt: new Date().toISOString(),
    };

    this.barberos.push(nuevoBarbero);

    return nuevoBarbero;
  }

  findAll(): Barbero[] {
    return this.barberos;
  }

  findOne(id: number): Barbero {

    const barbero = this.barberos.find(
      b => b.id === id,
    );

    if (!barbero) {
      throw new NotFoundException(
        `Barbero ${id} no existe`,
      );
    }

    return barbero;
  }

  update(
    id: number,
    dto: UpdateBarberoDto,
  ): Barbero {

    const barbero = this.findOne(id);

    Object.assign(barbero, dto);

    return barbero;
  }

  remove(id: number): void {

    const index = this.barberos.findIndex(
      b => b.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(
        `Barbero ${id} no existe`,
      );
    }

    this.barberos.splice(index, 1);
  }
}
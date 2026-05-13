import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {

  private servicios: Servicio[] = [];
  private nextId = 1;

  create(dto: CreateServicioDto): Servicio {

    const nuevoServicio: Servicio = {
      id: this.nextId++,
      nombre: dto.nombre,
      duracion: dto.duracion,
      precio: dto.precio,
      descripcion: dto.descripcion,
      createdAt: new Date().toISOString(),
    };

    this.servicios.push(nuevoServicio);

    return nuevoServicio;
  }

  findAll(): Servicio[] {
    return this.servicios;
  }

  findOne(id: number): Servicio {

    const servicio = this.servicios.find(s => s.id === id);

    if (!servicio) {
      throw new NotFoundException(`Servicio ${id} no existe`);
    }

    return servicio;
  }

  update(id: number, dto: UpdateServicioDto): Servicio {

    const servicio = this.findOne(id);

    Object.assign(servicio, dto);

    return servicio;
  }

  remove(id: number): void {

    const index = this.servicios.findIndex(s => s.id === id);

    if (index === -1) {
      throw new NotFoundException(`Servicio ${id} no existe`);
    }

    this.servicios.splice(index, 1);
  }
}
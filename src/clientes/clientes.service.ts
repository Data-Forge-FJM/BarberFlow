import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {

  private clientes: Cliente[] = [];
  private nextId = 1;

  create(dto: CreateClienteDto): Cliente {

    const newCliente: Cliente = {
      id: this.nextId++,
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    this.clientes.push(newCliente);

    return newCliente;
  }

  findAll(): Cliente[] {
    return this.clientes;
  }

  findOne(id: number): Cliente {

    const found = this.clientes.find(c => c.id === id);

    if (!found) {
      throw new NotFoundException(`Cliente ${id} no existe`);
    }

    return found;
  }

  update(id: number, dto: UpdateClienteDto): Cliente {

    const cliente = this.findOne(id);

    Object.assign(cliente, dto);

    return cliente;
  }

  remove(id: number): void {

    const idx = this.clientes.findIndex(c => c.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Cliente ${id} no existe`);
    }

    this.clientes.splice(idx, 1);
  }
}
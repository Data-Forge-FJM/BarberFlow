import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateClienteDto) {

    return this.prisma.cliente.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
      },
    });
  }

  async findAll() {

    return this.prisma.cliente.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {

    const cliente =
      await this.prisma.cliente.findUnique({
        where: { id },
      });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente ${id} no existe`,
      );
    }

    return cliente;
  }

  async update(
    id: number,
    dto: UpdateClienteDto,
  ) {

    await this.findOne(id);

    return this.prisma.cliente.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
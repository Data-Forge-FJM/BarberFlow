import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { ServiciosModule } from './servicios/servicios.module';
import { BarberosModule } from './barberos/barberos.module';
import { HorariosModule } from './horarios/horarios.module';
import { ReservasModule } from './reservas/reservas.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ClientesModule, ServiciosModule, BarberosModule, HorariosModule, ReservasModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

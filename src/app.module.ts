import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { ServiciosModule } from './servicios/servicios.module';
import { BarberosModule } from './barberos/barberos.module';

@Module({
  imports: [ClientesModule, ServiciosModule, BarberosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

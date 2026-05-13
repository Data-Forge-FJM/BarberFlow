import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { ServiciosModule } from './servicios/servicios.module';

@Module({
  imports: [ClientesModule, ServiciosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

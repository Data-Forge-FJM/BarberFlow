import { Module } from '@nestjs/common';
import { BarberosController } from './barberos.controller';
import { BarberosService } from './barberos.service';

@Module({
  controllers: [BarberosController],
  providers: [BarberosService]
})
export class BarberosModule {}

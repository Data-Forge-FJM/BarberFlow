import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateReservaDto {

  @IsNumber()
  clienteId: number;

  @IsNumber()
  servicioId: number;

  @IsNumber()
  barberoId: number;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  hora: string;

  @IsString()
  estado: string;

  @IsString()
  dia: string;

}
import {IsNotEmpty,IsNumber,IsOptional,IsString,
} from 'class-validator';

export class CreateServicioDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  duracion: number;

  @IsNumber()
  precio: number;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
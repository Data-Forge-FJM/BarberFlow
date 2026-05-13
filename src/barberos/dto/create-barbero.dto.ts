import {
  IsBoolean,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateBarberoDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  especialidad?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsBoolean()
  disponible: boolean;
}
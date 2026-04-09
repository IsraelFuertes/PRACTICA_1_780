import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateLibroDto {

  @IsString()
  titulo!: string;

  @IsString()
  autor!: string;

  @IsInt()
  anio!: number;

  @IsBoolean()
  leido!: boolean;
}
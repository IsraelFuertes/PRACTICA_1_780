import { IsString, IsInt, IsBoolean, Min } from 'class-validator';

export class CreateLibroDto {

  @IsString()
  titulo!: string;

  @IsString()
  autor!: string;

  @IsInt()
  @Min(0) 
  anio!: number;

  @IsBoolean()
  leido!: boolean;
}
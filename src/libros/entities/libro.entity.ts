import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Libro {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  autor!: string;

  @Column()
  anio!: number;

  @Column({ default: false })
  leido!: boolean;
}
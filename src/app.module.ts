import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibrosModule } from './libros/libros.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'libros_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LibrosModule,
  ],
})
export class AppModule {}
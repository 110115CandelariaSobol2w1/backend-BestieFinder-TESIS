import { Module } from '@nestjs/common';
import { DonacionesService } from './donaciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donacion } from './entities/donacion.entity';
import { DonacionesController } from './donaciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Donacion])],
  controllers:[DonacionesController],
  providers: [DonacionesService],
})
export class DonacionesModule {}

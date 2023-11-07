import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoTurnoDto } from './create-estado_turno.dto';

export class UpdateEstadoTurnoDto extends PartialType(CreateEstadoTurnoDto) {}

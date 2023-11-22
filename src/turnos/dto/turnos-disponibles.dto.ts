import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnoDto } from './create-turno.dto';

export class turnosDisponiblesDto{
    refugio_id: number
    turno_fecha: Date
    animal_id: number
}

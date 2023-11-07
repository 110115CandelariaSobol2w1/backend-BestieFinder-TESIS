import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalEstadoDto } from './create-animal_estado.dto';

export class UpdateAnimalEstadoDto extends PartialType(CreateAnimalEstadoDto) {}

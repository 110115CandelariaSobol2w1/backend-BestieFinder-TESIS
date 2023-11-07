import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalTipoDto } from './create-animal_tipo.dto';

export class UpdateAnimalTipoDto extends PartialType(CreateAnimalTipoDto) {}

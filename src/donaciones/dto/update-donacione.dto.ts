import { PartialType } from '@nestjs/mapped-types';
import { CreateDonacionDto } from './create-donacion.dto';

export class UpdateDonacioneDto extends PartialType(CreateDonacionDto) {}

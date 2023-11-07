import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosRefugioDto } from './create-usuarios_refugio.dto';

export class UpdateUsuariosRefugioDto extends PartialType(CreateUsuariosRefugioDto) {}

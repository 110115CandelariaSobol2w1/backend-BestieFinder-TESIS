import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RedesSocialesService } from './redes_sociales.service';
import { CreateRedesSocialeDto } from './dto/create-redes_sociale.dto';
import { UpdateRedesSocialeDto } from './dto/update-redes_sociale.dto';

@Controller('redes-sociales')
export class RedesSocialesController {
  constructor(private readonly redesSocialesService: RedesSocialesService) {}

  @Post()
  create(@Body() createRedesSocialeDto: CreateRedesSocialeDto) {
    return this.redesSocialesService.create(createRedesSocialeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.redesSocialesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRedesSocialeDto: UpdateRedesSocialeDto) {
    return this.redesSocialesService.update(+id, updateRedesSocialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.redesSocialesService.delete(id);
  }
}

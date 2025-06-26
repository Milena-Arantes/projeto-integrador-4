import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LembreteService } from './lembrete.service';
import { CreateLembreteDto } from './dto/create-lembrete.dto';
import { UpdateLembreteDto } from './dto/update-lembrete.dto';

@Controller('lembrete')
export class LembreteController {
  constructor(private readonly lembreteService: LembreteService) {}

  @Post()
  create(@Body() createLembreteDto: CreateLembreteDto) {
    return this.lembreteService.create(createLembreteDto);
  }

  @Get()
  findAll() {
    return this.lembreteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lembreteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLembreteDto: UpdateLembreteDto) {
    return this.lembreteService.update(+id, updateLembreteDto);
  }

  @Get('buscar/:nome')
  async buscarPorNome(@Param('nome') nome: string) {
  return this.lembreteService.buscarPorNome(nome);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lembreteService.remove(+id);
  }
}

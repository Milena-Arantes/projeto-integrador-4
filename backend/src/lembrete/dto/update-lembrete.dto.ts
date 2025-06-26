import { PartialType } from '@nestjs/mapped-types';
import { CreateLembreteDto } from './create-lembrete.dto';

export class UpdateLembreteDto extends PartialType(CreateLembreteDto) {}

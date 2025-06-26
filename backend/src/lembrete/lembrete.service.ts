import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLembreteDto } from './dto/create-lembrete.dto';
import { UpdateLembreteDto } from './dto/update-lembrete.dto';
import { MailService } from '../mail/mail.service';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class LembreteService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private smsService: SmsService,
  ) {}

  async create(data: CreateLembreteDto) {

    console.log('Dados para criar lembrete:', data);    const lembreteData = {
      nome: data.nome,
      idade: data.idade,
      notificacao: data.notificacao,
      telefone: data.telefone ?? null,
      email: data.email ?? null,
      medicamento: data.medicamento,
      doseValor: data.doseValor,
      doseUnidade: data.doseUnidade,
      usoContinuo: data.usoContinuo,
      dias: data.dias ?? null,
      usoInicio: data.usoInicio ? new Date(data.usoInicio) : null,
      intervalo: data.intervalo ?? null,
      horario: data.horario ?? null,
      quantidade: data.quantidade ?? null,
    };

    const lembrete = await this.prisma.lembrete.create({ data: lembreteData });    console.log('Lembrete criado:', lembrete);  // Depois da criação

    if (data.notificacao && data.email && data.horario) {
      await this.mailService.enviarEmailLembrete(
        data.email,
        data.medicamento,
        data.horario,
      );
    }

    if (data.notificacao && data.telefone && data.horario) {
      await this.smsService.enviarSms(
        data.telefone,
        data.medicamento,
        data.horario,
      );
    }

    return lembrete;
  }

  async findAll() {
    return this.prisma.lembrete.findMany();
  }

  async findOne(id: number) {
    return this.prisma.lembrete.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateLembreteDto) {
    return this.prisma.lembrete.update({
      where: { id },
      data,
    });
  }

  async buscarPorNome(nome: string) {
  return this.prisma.lembrete.findMany({
    where: {
      nome: {
        contains: nome,
        mode: 'insensitive'
      }
    }
  });
}

  async remove(id: number) {
    return this.prisma.lembrete.delete({ where: { id } });
  }
}

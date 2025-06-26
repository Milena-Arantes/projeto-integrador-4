import { Module } from '@nestjs/common';
import { LembreteService } from './lembrete.service';
import { LembreteController } from './lembrete.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service'; // <-- IMPORTAR o MailService
import { SmsService } from '../sms/sms.service'; // <-- IMPORTAR o SmsService

@Module({
  controllers: [LembreteController],
  providers: [LembreteService, PrismaService, MailService, SmsService], // <-- ADD aqui também
})
export class LembreteModule {}

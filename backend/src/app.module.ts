import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { LembreteModule } from './lembrete/lembrete.module';
import { MailService } from './mail/mail.service';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }), LembreteModule],
  providers: [PrismaService, MailService],
})
export class AppModule {}
























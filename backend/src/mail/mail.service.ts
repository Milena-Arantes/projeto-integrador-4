import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private sesClient: SESClient;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_SES_REGION') ?? '';
    const accessKeyId = this.configService.get<string>('AWS_SES_ACCESS_KEY') ?? '';
    const secretAccessKey = this.configService.get<string>('AWS_SES_SECRET_KEY') ?? '';
    const fromEmail = this.configService.get<string>('AWS_SES_EMAIL_FROM') ?? '';

    if (!region || !accessKeyId || !secretAccessKey || !fromEmail) {
      throw new Error('Faltando configurações do SES no .env!');
    }

    this.sesClient = new SESClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    this.fromEmail = fromEmail;
  }

  async enviarEmailLembrete(destinatario: string, medicamento: string, horario: string) {
    const params = {
      Destination: {
        ToAddresses: [destinatario],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <h1>Olá!</h1>
              <p>Este é um lembrete para tomar seu medicamento <strong>${medicamento}</strong> no horário <strong>${horario}</strong>.</p>
              <p>Cuide da sua saúde! 💊⏰</p>
            `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Lembrete de Medicamento',
        },
      },
      Source: this.fromEmail,
    };

    const command = new SendEmailCommand(params);
    await this.sesClient.send(command);
  }
}

import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private snsClient: SNSClient;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_SES_REGION') ?? '';
    const accessKeyId = this.configService.get<string>('AWS_SES_ACCESS_KEY') ?? '';
    const secretAccessKey = this.configService.get<string>('AWS_SES_SECRET_KEY') ?? '';

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('Faltando configurações do AWS SNS no .env!');
    }

    this.snsClient = new SNSClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async enviarSms(telefone: string, medicamento: string, horario: string) {
    const params = {
      Message: `Lembrete: tome seu medicamento ${medicamento} às ${horario}.`,
      PhoneNumber: telefone, // Precisa estar no formato internacional +55 para Brasil!
    };

    const command = new PublishCommand(params);
    await this.snsClient.send(command);
  }
}

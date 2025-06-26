import { IsBoolean, 
  IsEmail, 
  IsInt, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsNumber, 
  Min, 
  IsIn, 
  IsDateString,
  Matches } from 'class-validator';

export class CreateLembreteDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome: string;

  @IsInt({ message: 'A idade deve ser um número inteiro' })
  @Min(0, { message: 'A idade deve ser maior ou igual a zero' })
  @IsNotEmpty({ message: 'A idade não pode estar vazia' })
  idade: number;

  @IsBoolean()
  notificacao: boolean;
  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string' })
  @Matches(/^\+55\d{2}9\d{8}$/, { 
    message: 'O telefone deve seguir o padrão brasileiro: +55DDNNNNNNNNN (ex: +5519988887777)' 
  })
  telefone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  email?: string;

  @IsString({ message: 'O medicamento deve ser uma string' })
  @IsNotEmpty({ message: 'O medicamento não pode estar vazio' })
  medicamento: string;

  @IsNumber()
  @Min(0.1, { message: 'A dose deve ser maior que zero' })
  doseValor: number;

  @IsString()
  @IsIn(['ml', 'g', 'cápsula', 'comprimido', 'gotas'])
  @IsNotEmpty()
  doseUnidade: string;

  @IsBoolean()
  usoContinuo: boolean;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Os dias devem ser um número inteiro maior ou igual a zero' })
  dias?: number;
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'O intervalo deve ser um número maior ou igual a zero' })
  intervalo?: number;@IsOptional()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
    message: 'O horário deve estar no formato HH:mm (ex: 08:30, 14:45)' 
  })
  horario?: string;
  @IsOptional()
  @IsDateString({}, { message: 'A data de início deve ser uma data válida' })
  usoInicio?: string;  // Data no formato ISO, pois no DTO usamos string para datas

  @IsOptional()
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade deve ser maior que zero' })
  quantidade?: number;
}


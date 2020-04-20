import {
  IsEmail,
  Length,
  IsNumberString,
  MinLength,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false, example: 'João Silva' })
  name: string;

  @IsEmail()
  @ApiProperty({ nullable: false, example: 'joao@email.com' })
  email: string;

  @Length(11, 11)
  @ApiProperty({
    nullable: false,
    minLength: 11,
    maxLength: 11,
    example: '12345678900',
  })
  @IsNumberString()
  cpf: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ nullable: false, minLength: 8, example: '12345678' })
  password: string;
}

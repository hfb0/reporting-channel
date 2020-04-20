import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsEmail()
  @ApiProperty({ nullable: false, example: 'joao@email.com' })
  email: string;

  @IsString()
  @ApiProperty({ nullable: false, example: '12345678' })
  password: string;
}

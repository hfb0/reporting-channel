import {
  IsEmail,
  Length,
  IsNumberString,
  MinLength,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @Length(11, 11)
  @IsNumberString()
  cpf: string;

  @IsString()
  @MinLength(8)
  password: string;
}

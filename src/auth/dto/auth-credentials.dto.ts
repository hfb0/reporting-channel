import { MinLength, IsString, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

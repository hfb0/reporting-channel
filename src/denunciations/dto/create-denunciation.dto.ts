import {
  IsLatitude,
  IsString,
  IsNotEmpty,
  IsLongitude,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDenunciationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ nullable: false, example: 'Esgoto a céu aberto' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    example: 'Existe um esgoto a céu aberto nesta localidade.',
  })
  description: string;

  @IsNumber()
  @IsLatitude()
  @ApiProperty({ nullable: false, example: -9.6671041 })
  latitude: number;

  @IsNumber()
  @IsLongitude()
  @ApiProperty({ nullable: false, example: -35.7267423 })
  longitude: number;
}

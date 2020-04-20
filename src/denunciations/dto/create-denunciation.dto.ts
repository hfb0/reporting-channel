import {
  IsLatitude,
  IsString,
  IsNotEmpty,
  IsLongitude,
  IsNumber,
} from 'class-validator';

export class CreateDenunciationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsLatitude()
  @IsNumber()
  latitude: number;

  @IsNumber()
  @IsLongitude()
  longitude: number;
}

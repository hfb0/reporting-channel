import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/adresses/dto/create-address.dto';
import { Denunciation } from '../denunciation.entity';

export class DenunciationResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Esgoto a céu aberto' })
  title: string;

  @ApiProperty({ example: 'Existe um esgoto a céu aberto nesta localidade.' })
  description: string;

  @ApiProperty({ example: -9.6671041 })
  latitude: number;

  @ApiProperty({ example: -35.7267423 })
  longitude: number;

  @ApiProperty()
  address: CreateAddressDto;

  constructor(
    id: number,
    title: string,
    description: string,
    latitude: number,
    longitude: number,
    address: CreateAddressDto,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
  }

  static bulidList(denunciationEntity: Denunciation[]) {
    return denunciationEntity.map(
      item =>
        new DenunciationResponseDto(
          item.id,
          item.title,
          item.description,
          item.latitude,
          item.longitude,
          CreateAddressDto.build(item.address),
        ),
    );
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../address.entity';

export class CreateAddressDto {
  @ApiProperty({ example: '57025-510' })
  postalCode: string;

  @ApiProperty({ example: 'BR' })
  country: string;

  @ApiProperty({ example: 'Alagoas' })
  state: string;

  @ApiProperty({ example: 'Maceió' })
  city: string;

  @ApiProperty({ example: 'Jaraguá' })
  neighborhood: string;

  @ApiProperty({ example: 'Avenida Walter Ananias' })
  street: string;

  constructor(
    postalCode: string,
    country: string,
    state: string,
    city: string,
    neighborhood?: string,
    street?: string,
  ) {
    this.postalCode = postalCode;
    this.country = country;
    this.state = state;
    this.city = city;
    this.neighborhood = neighborhood;
    this.street = street;
  }

  static build(addressEntity: Address) {
    return new CreateAddressDto(
      addressEntity.postalCode,
      addressEntity.country,
      addressEntity.state,
      addressEntity.city,
      addressEntity.neighborhood,
      addressEntity.street,
    );
  }
}

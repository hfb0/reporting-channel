export class CreateAddressDto {
  postalCode: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
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
}

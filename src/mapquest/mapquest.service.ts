import {
  Injectable,
  HttpService,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAddressDto } from 'src/adresses/dto/create-address.dto';
import { LocationPayload } from './location-payload.interface';
import { ParamsPayload } from './params-payload.interface';
import { GeocodeQuality } from './geocode-quality.enum';

@Injectable()
export class MapquestService {
  private baseURL = 'http://www.mapquestapi.com';
  private apiKey: string;
  private badGranularity = [GeocodeQuality.COUNTRY, GeocodeQuality.STATE];

  constructor(private httpService: HttpService) {
    this.apiKey = process.env.MAP_API_KEY;
  }

  async findByGeoCode(lat: number, lon: number) {
    const geoCodePathURL = 'geocoding/v1/reverse';

    const params: ParamsPayload = {
      key: this.apiKey,
      location: `${lat}, ${lon}`,
      thumbMaps: false,
    };

    const response = await this.httpService
      .get(geoCodePathURL, {
        baseURL: this.baseURL,
        params: params,
      })
      .toPromise();

    return this.formatDataToAddress(response.data.results[0].locations);
  }

  formatDataToAddress(locations: Array<LocationPayload>): CreateAddressDto {
    // Valida endereco
    this.validateGranularity(locations);

    return locations.map(
      location =>
        new CreateAddressDto(
          location.postalCode,
          location.adminArea1,
          location.adminArea3,
          location.adminArea5,
          location.adminArea6,
          location.street,
        ),
    )[0];
  }

  // Valida se endereço possui pelo menos a cidade
  validateGranularity(locations: Array<LocationPayload>): void {
    if (locations.length === 0) {
      throw new NotFoundException('Address not found.');
    }

    const bad = this.badGranularity.find(item => {
      return item == locations[0].geocodeQuality;
    });

    if (bad) {
      throw new UnprocessableEntityException(
        'The address has high granularity.',
      );
    }
  }
}

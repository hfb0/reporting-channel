import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { MapquestService } from 'src/mapquest/mapquest.service';

@Injectable()
export class AdressesService {
  constructor(
    @InjectRepository(Address)
    private adressesRepository: Repository<Address>,
    private mapquestService: MapquestService,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.adressesRepository.create(createAddressDto);

    return await address.save();
  }

  async getAddressByGeolocation(lat: number, lon: number): Promise<Address> {
    const addressDto = await this.mapquestService.findByGeoCode(lat, lon);

    // Procura no banco de dados
    const addressDB = await this.adressesRepository.findOne({where: addressDto});
    if(addressDB) {
        return addressDB;
    }

    return await this.create(addressDto);
  }
}

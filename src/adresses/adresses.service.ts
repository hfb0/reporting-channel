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

  async findOrCreate(addressDto: CreateAddressDto): Promise<Address> {
    // Procura no banco de dados
    let addressDB = await this.adressesRepository.findOne({
      where: addressDto,
    });

    if (!addressDB) {
      const address = this.adressesRepository.create(addressDto);
      addressDB = await address.save();
    }

    return addressDB;
  }

  async getAddressByGeolocation(lat: number, lon: number): Promise<Address> {
    // Procura na api maqquest
    const addressDto = await this.mapquestService.findByGeoCode(lat, lon);

    return await this.findOrCreate(addressDto);
  }
}

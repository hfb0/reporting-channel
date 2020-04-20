import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AdressesService {
  constructor(
    @InjectRepository(Address)
    private adressesRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const address = this.adressesRepository.create(createAddressDto);
    await address.save();
  }
}

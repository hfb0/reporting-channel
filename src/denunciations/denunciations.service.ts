import { Injectable } from '@nestjs/common';
import { Denunciation } from './denunciation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDenunciationDto } from './dto/create-denunciation.dto';
import { User } from 'src/users/user.entity';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { AdressesService } from 'src/adresses/adresses.service';

@Injectable()
export class DenunciationsService {
  constructor(
    @InjectRepository(Denunciation)
    private denunciationsRepository: Repository<Denunciation>,
    private readonly adressesServices: AdressesService,
  ) {}

  async create(
    createDenunciationDto: CreateDenunciationDto,
    user: JwtPayload,
  ): Promise<void> {
    //Pega id do usuario logado
    const userEntity = new User();
    userEntity.id = user.id;

    // Busca endereco
    const address = await this.adressesServices.getAddressByGeolocation(
      createDenunciationDto.latitude,
      createDenunciationDto.longitude,
    );

    // Salva denuncia
    const denunciation = this.denunciationsRepository.create({
      ...createDenunciationDto,
      denunciator: userEntity,
      address,
    });

    await denunciation.save();
  }

  async findByUser(user: JwtPayload) {
    return await this.denunciationsRepository.find({
      // eslint-disable-next-line @typescript-eslint/camelcase
      where: { denunciator_id: user.id },
    });
  }
}

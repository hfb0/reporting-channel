import { Injectable } from '@nestjs/common';
import { Denunciation } from './denunciation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDenunciationDto } from './dto/create-denunciation.dto';
import { User } from 'src/users/user.entity';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class DenunciationsService {
  constructor(
    @InjectRepository(Denunciation)
    private denunciationsRepository: Repository<Denunciation>,
  ) {}

  async create(
    createDenunciationDto: CreateDenunciationDto,
    user: JwtPayload,
  ): Promise<void> {
    const userEntity = new User();
    userEntity.id = user.id;

    const cause = this.denunciationsRepository.create({
      ...createDenunciationDto,
      denunciator: userEntity,
    });

    await cause.save();
  }

  async findByUser(user: JwtPayload) {
    return await this.denunciationsRepository.find({
      // eslint-disable-next-line @typescript-eslint/camelcase
      where: { denunciator_id: user.id },
    });
  }
}

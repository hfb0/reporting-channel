import { Module } from '@nestjs/common';
import { DenunciationsController } from './denunciations.controller';
import { DenunciationsService } from './denunciations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Denunciation } from './denunciation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Denunciation, User])],
  controllers: [DenunciationsController],
  providers: [DenunciationsService],
})
export class DenunciationsModule {}

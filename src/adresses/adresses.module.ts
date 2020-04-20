import { Module } from '@nestjs/common';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { MapquestModule } from 'src/mapquest/mapquest.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), MapquestModule],
  controllers: [AdressesController],
  providers: [AdressesService],
  exports: [AdressesService],
})
export class AdressesModule {}

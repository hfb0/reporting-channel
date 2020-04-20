import { Module } from '@nestjs/common';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AdressesController],
  providers: [AdressesService],
})
export class AdressesModule {}

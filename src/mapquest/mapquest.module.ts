import { Module, HttpModule } from '@nestjs/common';
import { MapquestService } from './mapquest.service';

@Module({
  imports: [HttpModule],
  providers: [MapquestService],
  exports: [MapquestService],
})
export class MapquestModule {}

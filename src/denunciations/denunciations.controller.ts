import { Controller, UseGuards, Body, Post, Get } from '@nestjs/common';
import { DenunciationsService } from './denunciations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateDenunciationDto } from './dto/create-denunciation.dto';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { User } from 'src/users/user.decorator';

@Controller('denunciations')
export class DenunciationsController {
  constructor(private readonly denunciationsService: DenunciationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async store(
    @User() user: JwtPayload,
    @Body() createDenunciationDto: CreateDenunciationDto,
  ) {
    return await this.denunciationsService.create(createDenunciationDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(@User() user: JwtPayload) {
    return await this.denunciationsService.findByUser(user);
  }
}

import { Controller, UseGuards, Body, Post, Get } from '@nestjs/common';
import { DenunciationsService } from './denunciations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateDenunciationDto } from './dto/create-denunciation.dto';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { User } from 'src/users/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Denunciation } from './denunciation.entity';
import { DenunciationResponseDto } from './dto/denunciation-response.dto';

@ApiBearerAuth()
@ApiTags('denunciations')
@Controller('denunciations')
export class DenunciationsController {
  constructor(private readonly denunciationsService: DenunciationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @ApiCreatedResponse({
    description: 'Denunciation created',
    type: DenunciationResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'The address has high granularity',
  })
  async store(
    @User() user: JwtPayload,
    @Body() createDenunciationDto: CreateDenunciationDto,
  ): Promise<DenunciationResponseDto> {
    return await this.denunciationsService.create(createDenunciationDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Logged user reports' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async index(@User() user: JwtPayload): Promise<Denunciation[]> {
    return await this.denunciationsService.findByUser(user);
  }
}

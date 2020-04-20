import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoggedUserDto } from './dto/logged-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @ApiCreatedResponse({ description: 'Login success', type: LoggedUserDto })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoggedUserDto> {
    return this.authService.signIn(authCredentialsDto);
  }
}

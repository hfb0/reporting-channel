import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserNonConfidential } from './dto/user-nonconfidential.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ user: UserNonConfidential; token: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserNonConfidentialDto } from './dto/user-nonconfidential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { LoggedUserDto } from './dto/logged-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;

    const user = await this.usersService.findByEmail(email);
    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { id: user.id };
    const token = await this.generateToken(payload);
    const unconfidential = this.getOnlyNonConfidentialUserData(user);
    const loggedUserDto = new LoggedUserDto(unconfidential, token);

    return loggedUserDto;
  }

  generateToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  getOnlyNonConfidentialUserData(user): UserNonConfidentialDto {
    const unconfidential = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return unconfidential;
  }
}

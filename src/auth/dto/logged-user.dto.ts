import { ApiProperty } from '@nestjs/swagger';
import { UserNonConfidentialDto } from './user-nonconfidential.dto';

export class LoggedUserDto {
  @ApiProperty()
  user: UserNonConfidentialDto;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg3MzQ0NzQyLCJleHAiOjE1ODc5NDk1NDJ9.V11GZOvcL0gc3dHiS-BrdIxvZwMl0VjpkX4h_3qZP7A',
  })
  token: string;

  constructor(user: UserNonConfidentialDto, token: string) {
    this.user = user;
    this.token = token;
  }
}

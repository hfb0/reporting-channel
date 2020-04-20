import { ApiProperty } from '@nestjs/swagger';

export class UserNonConfidentialDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'João Silva' })
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;
}

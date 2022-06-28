import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({
    example: 'email@email.com',
    description: `O email será usado apenas para cadastrar um novo client, já o id será usado para realizar o login.`,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '123@abc',
    description: `Senha do client.`,
  })
  @IsString()
  @IsOptional()
  secret?: string;
}

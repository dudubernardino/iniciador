import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Cria um cliente.' })
  @Post()
  async create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retorna um cliente.' })
  @ApiBearerAuth('JWT-auth')
  @Get(':clientId')
  find(@Param('clientId') clientId: number) {
    return this.clientService.find(clientId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retorna todos os clientes.' })
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Atualiza os dados de um cliente.' })
  @ApiBearerAuth('JWT-auth')
  @Patch(':clientId')
  update(
    @Param('clientId') clientId: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(clientId, updateClientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Remove um cliente.' })
  @ApiBearerAuth('JWT-auth')
  @Delete(':clientId')
  delete(@Param('clientId') clientId: number) {
    return this.clientService.delete(clientId);
  }
}

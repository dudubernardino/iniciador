import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Get(':clientId')
  find(@Param('clientId') clientId: number) {
    return this.clientService.find(clientId);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Patch(':clientId')
  update(
    @Param('clientId') clientId: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(clientId, updateClientDto);
  }

  @Delete(':clientId')
  delete(@Param('clientId') clientId: number) {
    return this.clientService.delete(clientId);
  }
}

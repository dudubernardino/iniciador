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
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';

import { ShoeService } from './shoes.service';

@ApiTags('shoes')
@Controller('shoes')
export class ShoeController {
  constructor(private readonly shoeService: ShoeService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Cria um sapato.' })
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() dto: CreateShoeDto) {
    return this.shoeService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retorna um sapato.' })
  @ApiBearerAuth('JWT-auth')
  @Get(':shoeId')
  find(@Param('shoeId') shoeId: number) {
    return this.shoeService.find(shoeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retorna todos os sapatos.' })
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll() {
    return this.shoeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Atualiza os dados de um sapato.' })
  @ApiBearerAuth('JWT-auth')
  @Patch(':shoeId')
  update(
    @Param('shoeId') shoeId: number,
    @Body() updateClientDto: UpdateShoeDto,
  ) {
    return this.shoeService.update(shoeId, updateClientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Remove um sapato.' })
  @ApiBearerAuth('JWT-auth')
  @Delete(':shoeId')
  delete(@Param('shoeId') shoeId: number) {
    return this.shoeService.delete(shoeId);
  }
}

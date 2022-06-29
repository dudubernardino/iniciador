import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginClientDto } from './dto/login-client.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Faz login de um cliente.' })
  @Post('login')
  async login(@Body() loginClient: LoginClientDto, @Req() req: any) {
    return await this.authService.login(req.user);
  }
}

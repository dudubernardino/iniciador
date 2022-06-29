import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'apps/auth/src/strategies/jwt.strategy';
import { Shoe } from './entities/shoes.entity';
import { ShoeController } from './shoes.controller';
import { ShoeService } from './shoes.service';

@Module({
  controllers: [ShoeController],
  providers: [ShoeService],
  imports: [TypeOrmModule.forFeature([Shoe]), JwtStrategy],
})
export class ShoeModule {}

import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerRepository } from './persistence/partner.repository';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [PartnersService],
  imports: [TypeOrmModule.forFeature([PartnerRepository])]
})
export class PartnersModule {}

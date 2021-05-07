import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  PaginationResult,
  Partner,
  QueryParams,
} from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { PartnersService } from './partners.service';
import { PartialUpdate } from '@system4blue/api/validation';
import { OutPartnerDto } from './dto/out.partner';
import { PartnerDto } from './dto/partner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private partnersService: PartnersService) {}

  @Get(':id')
  async getById(@Param('id') id: UUID4): Promise<OutPartnerDto> {
    return this.partnersService.getById(id);
  }

  @Get()
  async getMany(
    @Query() queryParams: QueryParams<Partner>
  ): Promise<PaginationResult<OutPartnerDto>> {
    return this.partnersService.getMany(queryParams);
  }

  @Post()
  async create(@Body() partner: PartnerDto): Promise<OutPartnerDto> {
    return this.partnersService.create(partner);
  }

  @Put(':id')
  @PartialUpdate()
  async update(
    @Param('id') id: UUID4,
    @Body() partner: Partner
  ): Promise<void> {
    return this.partnersService.update(id, partner);
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID4): Promise<void> {
    return this.partnersService.delete(id);
  }
}

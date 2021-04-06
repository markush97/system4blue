import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationResult, Partner, QueryParams } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
  constructor(private partnersService: PartnersService) {}

  @Get(':id')
  async getById(@Param('id') id: UUID4): Promise<Partner> {
    return this.partnersService.getById(id);
  }

  @Get()
  async getMany(@Query() queryParams: QueryParams<Partner>): Promise<PaginationResult<Partner>> {
    return this.partnersService.getMany(queryParams);
  }

  @Post()
  async create(@Body() partner: Partner): Promise<Partner> {
    return this.partnersService.create(partner);
  }

  @Put(':id')
  async update(@Param('id') id: UUID4, @Body() partner: Partner): Promise<void> {
    return this.partnersService.update(id, partner)
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID4): Promise<void> {
    return this.partnersService.delete(id);
  }
}

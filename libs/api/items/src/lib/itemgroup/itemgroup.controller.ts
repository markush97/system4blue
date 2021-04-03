import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Item, ItemGroup, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { ItemGroupService } from './itemgroup.service';

@Controller('itemgroup')
export class ItemGroupController {
  constructor(private itemgroupService: ItemGroupService) {

  }

  @Get(':id')
  async getById(@Param('id') id: UUID4): Promise<ItemGroup> {
    return this.itemgroupService.getById(id);
  }

  @Get()
  async getMany(@Query() queryParams: QueryParams<ItemGroup>): Promise<PaginationResult<ItemGroup>> {
    return this.itemgroupService.getMany(queryParams);
  }

  @Post()
  async create(@Body() item: ItemGroup): Promise<ItemGroup> {
    return this.itemgroupService.create(item);
  }

  @Post(':id')
  async createSubItem(@Param('id') id: UUID4, @Body() item: Item): Promise<ItemGroup> {
    return this.itemgroupService.createSubItem(id, item);
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID4): Promise<void> {
    return this.itemgroupService.delete(id);
  }
}

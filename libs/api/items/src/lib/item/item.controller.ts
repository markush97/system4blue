import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CheckResult, Item, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}


  @Get(':id')
  async getById(@Param('id') id: UUID4): Promise<Item> {
    return this.itemService.getById(id);
  }

  @Get()
  async getMany(@Query() queryParams: QueryParams<Item>): Promise<PaginationResult<Item>> {
    return this.itemService.getMany(queryParams);
  }

  @Post()
  async create(@Body() item: Item): Promise<Item> {
    return this.itemService.create(item);
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID4): Promise<void> {
    return this.itemService.delete(id);
  }

  @Post(':id')
  async addCheck(@Param('id') id: UUID4, @Body() check: CheckResult): Promise<Item> {
    return this.itemService.addCheck(id, check);
  }
}

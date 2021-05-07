import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CheckResult, Item, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { ItemDto } from './dto/item.dto';
import { ItemOutDto } from './dto/out.item.dto';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}


  @Get(':id')
  async getById(@Param('id') id: UUID4): Promise<ItemOutDto> {
    return this.itemService.getById(id);
  }

  @Get()
  async getMany(@Query() queryParams: QueryParams<Item>): Promise<PaginationResult<ItemOutDto>> {
    return this.itemService.getMany(queryParams);
  }

  @Post()
  async create(@Body() item: ItemDto): Promise<ItemOutDto> {
    return this.itemService.create(item);
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID4): Promise<void> {
    return this.itemService.delete(id);
  }

  @Post(':id')
  async addCheck(@Param('id') id: UUID4, @Body() check: CheckResult): Promise<ItemOutDto> {
    return this.itemService.addCheck(id, check);
  }
}

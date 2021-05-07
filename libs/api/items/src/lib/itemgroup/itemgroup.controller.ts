import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Item, ItemGroup, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { PartialUpdate } from '@system4blue/api/validation';
import { UUID4 } from '@system4blue/types';
import { ItemDto } from '../item/dto/item.dto';
import { ItemGroupDto } from './dto/itemgroup.dto';
import { ItemGroupOutDto } from './dto/out.itemgroup.dto';
import { ItemGroupService } from './itemgroup.service';

@Controller('itemgroup')
export class ItemGroupController {
  constructor(private itemgroupService: ItemGroupService) {

  }

  @Get(':id')
  async getById(@Param('id') id: UUID4): Promise<ItemGroup> {
    return new ItemGroupOutDto(await this.itemgroupService.getById(id));
  }

  @Get()
  async getMany(@Query() queryParams: QueryParams<ItemGroup>): Promise<PaginationResult<ItemGroupOutDto>> {
    const result = await this.itemgroupService.getMany(queryParams);
    result.data = result.data.map((group) => new ItemGroupOutDto(group));

    return result as PaginationResult<ItemGroupOutDto>;
  }

  @Post()
  async create(@Body() item: ItemGroupDto): Promise<ItemGroup> {
    return new ItemGroupOutDto(await this.itemgroupService.create(item));
  }

  @Put(':id')
  @PartialUpdate()
  async update(@Param('id') id: UUID4, @Body() itemGroup: ItemGroupDto) {
    return this.itemgroupService.updateItemGroup(id, itemGroup);
  }

  @Post(':id')
  async createSubItem(@Param('id') id: UUID4, @Body() item: ItemDto): Promise<ItemGroup> {
    return new ItemGroupOutDto(await this.itemgroupService.createSubItem(id, item));
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID4): Promise<void> {
    return this.itemgroupService.delete(id);
  }
}

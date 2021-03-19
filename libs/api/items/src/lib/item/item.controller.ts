import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Item } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}


  @Get(':id')
  async getById(@Param('id') id: UUID4): Promise<Item> {
    return this.itemService.getById(id);
  }

  @Get()
  async list(): Promise<Item[]> {
    return this.itemService.getMany();
  }

  @Post()
  async create(@Body() item: Item): Promise<Item> {
    return this.itemService.create(item);
  }

  @Delete(':id')
  async delete(@Param('id') id: UUID4): Promise<void> {
    return this.itemService.delete(id);
  }
}

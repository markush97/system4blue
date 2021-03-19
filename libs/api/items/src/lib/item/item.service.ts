import { Injectable } from '@nestjs/common';
import { Item } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getMany(): Promise<Item[]> {
    return this.itemRepository.findMany();
  }

  async create(item: Item): Promise<Item> {
    return this.itemRepository.create(item);
  }

  async delete(id: UUID4): Promise<void> {
    return this.itemRepository.deleteById(id);
  }

  async getById(id: UUID4): Promise<Item> {
    return this.itemRepository.findById(id);
  }
}

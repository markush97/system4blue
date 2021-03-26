import { Injectable } from '@nestjs/common';
import { Item, ItemGroup } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { ItemService } from '../item/item.service';
import { ItemGroupRepository } from './persistence/itemgroup.repository';

@Injectable()
export class ItemGroupService {
  constructor(private readonly itemGroupRepository: ItemGroupRepository, private readonly itemService: ItemService) {}

  async getMany(): Promise<ItemGroup[]> {
    return this.itemGroupRepository.findMany();
  }

  async create(item: ItemGroup): Promise<ItemGroup> {
    return this.itemGroupRepository.create(item);
  }

  async delete(id: UUID4): Promise<void> {
    return this.itemGroupRepository.deleteById(id);
  }

  async getById(id: UUID4): Promise<ItemGroup> {
    return this.itemGroupRepository.findById(id);
  }

  async createSubItem(id: UUID4, item: Item): Promise<ItemGroup> {
    const itemGroup = await this.itemGroupRepository.findById(id);

    item.itemGroup = itemGroup;
    item.description = item.description ?? itemGroup.description;
    item.expiration = item.expiration ??  new Date(new Date().getTime() + itemGroup.defaultLifespan).toISOString();
    item.price = item.price ?? itemGroup.pricePerUnit;

    await this.itemService.create(item);

    return this.itemGroupRepository.findById(id);
  }
}

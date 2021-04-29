import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemGroup, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { ItemService } from '../item/item.service';
import { ItemGroupRepository } from './persistence/itemgroup.repository';

const searchAbleFields: (string & keyof ItemGroup)[] = ['description', 'name'];

@Injectable()
export class ItemGroupService {
  constructor(private readonly itemGroupRepository: ItemGroupRepository, private readonly itemService: ItemService) {}

  async getMany(queryParams: QueryParams<ItemGroup>): Promise<PaginationResult<ItemGroup>> {
    return this.itemGroupRepository.getMany(parseFindManyParams(queryParams, searchAbleFields));
  }

  async create(itemGroup: ItemGroup): Promise<ItemGroup> {
    return this.itemGroupRepository.create(itemGroup);
  }

  async delete(id: UUID4): Promise<void> {
    return this.itemGroupRepository.deleteOneById(id);
  }

  async getById(id: UUID4): Promise<ItemGroup> {
    return this.itemGroupRepository.getOneById(id);
  }

  async updateItemGroup(id: UUID4, itemGroup: ItemGroup) {
    return this.itemGroupRepository.updateOneById(id, itemGroup);
  }

  async createSubItem(id: UUID4, item: Item): Promise<ItemGroup> {
    const itemGroup = await this.itemGroupRepository.getOneById(id);

    if (itemGroup === undefined) {
      throw new NotFoundException();
    }

    item.itemGroup = itemGroup;
    item.description = item.description ?? itemGroup.description;
    item.expiration = item.expiration ??  new Date(new Date().getTime() + itemGroup.defaultLifespan).toISOString().split("T")[0];
    item.price = item.price ?? itemGroup.pricePerUnit;

    await this.itemService.create(item);

    return this.itemGroupRepository.getOneById(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CheckResult, Item, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { CheckResultService } from '@system4blue/api/checks';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { ItemRepository } from './persistence/item.repository';
@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository, private readonly checkService: CheckResultService) {}


  async getMany(queryParams: QueryParams<Item>): Promise<PaginationResult<Item>> {
    return this.itemRepository.getMany(parseFindManyParams(queryParams));
  }

  async create(item: Item): Promise<Item> {
    return this.itemRepository.create(item);
  }

  async delete(id: UUID4): Promise<void> {
    return this.itemRepository.deleteOneById(id);
  }

  async getById(id: UUID4): Promise<Item> {
    return this.itemRepository.getOneById(id);
  }

  async addCheck(id: UUID4, check: CheckResult): Promise<Item> {
    const item = await this.itemRepository.getOneById(id);
    check.item = item;

    await this.checkService.create(check);

    return this.itemRepository.getOneById(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CheckResult, Item } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { CheckResultService } from 'libs/api/checks/src/lib/check-result.service';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository, private readonly checkService: CheckResultService) {}

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

  async addCheck(id: UUID4, check: CheckResult): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    check.item = item;

    await this.checkService.create(check);

    return this.itemRepository.findById(id);
  }
}

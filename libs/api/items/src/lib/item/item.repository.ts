import { Item } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { ItemEntity } from './item.entity';

@EntityRepository(ItemEntity)
export class ItemRepository extends AbstractRepository<ItemEntity> {
  async create(item: Item): Promise<Item> {
    return this.repository.save(this.repository.create(item));
  }

  async findById(id: UUID4): Promise<Item> {
    return this.repository.findOne(id);
  }

  async deleteById(id: UUID4): Promise<void> {
    this.repository.delete(id);
  }

  async update(id: UUID4, item: Item): Promise<void> {
    this.repository.update({id: id}, item);
  }

  async findMany(): Promise<Item[]> {
    return this.repository.find();
  }
}

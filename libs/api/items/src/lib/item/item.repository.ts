import { Item } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { ItemEntity } from './item.entity';
import { BasicRepository } from '@system4blue/core'

@EntityRepository(ItemEntity)
export class ItemRepository extends AbstractRepository<ItemEntity> {
  async create(entity: ItemEntity): Promise<ItemEntity> {
    return this.repository.save(this.repository.create(entity));
  }

  async findById(id: string): Promise<ItemEntity> {
    return this.repository.findOne(id);
  }

  async deleteById(id: string): Promise<void> {
    this.repository.delete(id);
  }

  async update(id: string, entity: ItemEntity): Promise<void> {
    this.repository.update(id, entity);
  }

  async findMany(): Promise<ItemEntity[]> {
    return this.repository.find();
  }
}

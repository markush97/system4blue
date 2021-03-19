import { ItemGroup } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { ItemGroupEntity } from './itemgroup.entity';

@EntityRepository(ItemGroupEntity)
export class ItemGroupRepository extends AbstractRepository<ItemGroupEntity> {
  async create(itemGroup: ItemGroup): Promise<ItemGroup> {
    return this.repository.save(this.repository.create(itemGroup));
  }

  async findById(id: UUID4): Promise<ItemGroup> {
    return this.repository.findOne(id, {relations: ['items']});
  }

  async deleteById(id: UUID4): Promise<void> {
    this.repository.delete(id);
  }

  async update(id: UUID4, itemGroup: ItemGroup): Promise<void> {
    this.repository.update({id: id}, itemGroup);
  }

  async findMany(): Promise<ItemGroup[]> {
    return this.repository.find();
  }

}

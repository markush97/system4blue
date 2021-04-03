import { EntityRepository } from 'typeorm';
import { ItemEntity } from './item.entity';
import { BasicRepository } from '@system4blue/api/crud';

@EntityRepository(ItemEntity)
export class ItemRepository extends BasicRepository<ItemEntity> {

}

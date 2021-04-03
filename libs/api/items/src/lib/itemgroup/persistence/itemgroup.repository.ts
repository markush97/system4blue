import { EntityRepository } from 'typeorm';
import { ItemGroupEntity } from './itemgroup.entity';
import { BasicRepository } from '@system4blue/api/crud';

@EntityRepository(ItemGroupEntity)
export class ItemGroupRepository extends BasicRepository<ItemGroupEntity> {

}


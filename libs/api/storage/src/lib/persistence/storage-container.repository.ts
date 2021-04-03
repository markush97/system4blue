import { EntityRepository } from 'typeorm';
import { BasicRepository } from '@system4blue/api/crud';
import { StorageContainerEntity } from './storage-container.entity';

@EntityRepository(StorageContainerEntity)
export class StorageContainerRepository extends BasicRepository<StorageContainerEntity> {

}

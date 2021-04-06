import { StorageContainer } from '@system4blue/api-interfaces';
import { BasicRepository } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { EntityRepository } from 'typeorm';
import { StorageContainerEntity } from './storage-container.entity';

@EntityRepository(StorageContainerEntity)
export class StorageContainerRepository extends BasicRepository<StorageContainerEntity> {

  async addContainer(container: StorageContainer, parentId: UUID4): Promise<StorageContainer> {
    const parent = await this.repository.findOne(parentId);
    container.parentContainer = parent;

    return this.repository.save(this.repository.create(container));
  }

  async getRoots(): Promise<StorageContainer[]> {
    return this.treeRepository.findRoots();
  }

  async getAll(): Promise<StorageContainer[]> {
    return this.treeRepository.findTrees();
  }

  async getAncestorList(container: StorageContainerEntity): Promise<StorageContainer[]> {
    return this.treeRepository.findAncestors(container);
  }
}

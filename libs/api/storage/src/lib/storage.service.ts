import { Injectable } from '@nestjs/common';
import { PaginationResult, QueryParams, StorageContainer } from '@system4blue/api-interfaces';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { StorageContainerRepository } from './persistence/storage-container.repository';

const searchAbleFields: (string & keyof StorageContainer)[] = ['name'];

@Injectable()
export class StorageService {
  constructor(private readonly storageRepository: StorageContainerRepository) {}

  async getMany(queryParams: QueryParams<StorageContainer>): Promise<PaginationResult<StorageContainer>> {
    return this.storageRepository.getMany(parseFindManyParams(queryParams, searchAbleFields));
  }

  async create(container: StorageContainer): Promise<StorageContainer> {
    return this.storageRepository.create(container);
  }

  async addContainer(container: StorageContainer, partentId: UUID4): Promise<StorageContainer>  {
    return this.storageRepository.addContainer(container, partentId);
  }

  async delete(id: UUID4): Promise<void> {
    return this.storageRepository.deleteOneById(id);
  }

  async getByIdWithAncestors(id: UUID4): Promise<StorageContainer & {ancestors: StorageContainer[]}> {
    const container = await this.storageRepository.getOneById(id);
    const ancestors = await this.storageRepository.getAncestorList(container);

    return {...container, ancestors: ancestors};
  }

  async getRoots(): Promise<StorageContainer[]> {
    return this.storageRepository.getRoots();
  }

  async getAll(): Promise<StorageContainer[]> {
    return this.storageRepository.getAll();
  }

  async updateContainer(containerId: UUID4, container: StorageContainer) {
    return this.storageRepository.updateOneById(containerId, container);
  }
}

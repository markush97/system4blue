import { Injectable } from '@nestjs/common';
import { PaginationResult, QueryParams, StorageContainer } from '@system4blue/api-interfaces';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { StorageContainerRepository } from './persistence/storage-container.repository';

@Injectable()
export class StorageService {
  constructor(private readonly storageRepository: StorageContainerRepository) {}

  async getMany(queryParams: QueryParams<StorageContainer>): Promise<PaginationResult<StorageContainer>> {
    return this.storageRepository.getMany(parseFindManyParams(queryParams));
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

  async getById(id: UUID4): Promise<StorageContainer> {
    return this.storageRepository.getOneById(id);
  }
}

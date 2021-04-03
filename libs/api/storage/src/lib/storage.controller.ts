import { Body, Controller, Param, Post } from '@nestjs/common';
import { StorageContainer } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post()
  async createRoot(@Body() storage: StorageContainer): Promise<StorageContainer> {
    return this.storageService.create(storage);
  }

  @Post(':id')
  async addContainer(@Body() storage: StorageContainer, @Param('id') parentId: UUID4): Promise<StorageContainer>  {
    return this.storageService.addContainer(storage, parentId);
  }

}

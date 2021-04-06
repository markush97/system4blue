import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StorageContainer } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post()
  async createRoot(@Body() container: StorageContainer): Promise<StorageContainer> {
    return this.storageService.create(container);
  }

  @Post(':id')
  async addContainer(@Body() container: StorageContainer, @Param('id') parentId: UUID4): Promise<StorageContainer>  {
    return this.storageService.addContainer(container, parentId);
  }

  @Put(':id')
  async updateContainer(@Body() container: StorageContainer, @Param('id') containerId: UUID4) {
    return this.storageService.updateContainer(containerId, container)
  }

  @Get('roots')
  async getRoots(): Promise<StorageContainer[]> {
    return this.storageService.getRoots();
  }

  @Get()
  async getAll(): Promise<StorageContainer[]> {
    return this.storageService.getAll();
  }

  @Get(':id')
  async getContainer(@Param('id') containerId: UUID4): Promise<StorageContainer> {
    return this.storageService.getByIdWithAncestors(containerId);
  }

  @Delete(':id')
  async deleteContainer(@Param('id') containerId: UUID4) {
    return this.storageService.delete(containerId);
  }
}

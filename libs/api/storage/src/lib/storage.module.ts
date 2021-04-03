import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageContainerRepository } from './persistence/storage-container.repository';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
  imports: [TypeOrmModule.forFeature([StorageContainerRepository])]
})
export class StorageModule {}

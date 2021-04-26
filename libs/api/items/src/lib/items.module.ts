import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecksModule } from '@system4blue/api/checks';
import { ItemController } from './item/item.controller';
import { ItemRepository } from './item/persistence/item.repository';
import { ItemService } from './item/item.service';
import { ItemGroupController } from './itemgroup/itemgroup.controller';
import { ItemGroupRepository } from './itemgroup/persistence/itemgroup.repository';
import { ItemGroupService } from './itemgroup/itemgroup.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository, ItemGroupRepository]), ChecksModule],
  controllers: [ItemController, ItemGroupController],
  providers: [ItemService, ItemGroupService],
  exports: [ItemService, ItemGroupService],
})
export class ItemsModule {}

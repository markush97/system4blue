import { Module } from '@nestjs/common';

import { ApiDatabaseModule } from '@system4blue/api/core';
import { ItemsModule } from '@system4blue/api/items';
import { ChecksModule } from '@system4blue/api/checks';
import { StorageModule } from '@system4blue/api/storage';
import { MembersModule } from '@system4blue/api/members';
import { PartnersModule } from '@system4blue/api/partners';

@Module({
  imports: [ApiDatabaseModule, ItemsModule, ChecksModule, StorageModule, MembersModule, PartnersModule],
})
export class AppModule {}

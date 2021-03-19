import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiDatabaseModule } from '@system4blue/core';
import { ItemsModule } from '@system4blue/api/items';
import { ChecksModule } from '@system4blue/checks';

@Module({
  imports: [ApiDatabaseModule, ItemsModule, ChecksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

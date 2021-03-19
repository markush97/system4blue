import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiDatabaseModule } from '@system4blue/core';
import { ItemsModule } from '@system4blue/api/items';

@Module({
  imports: [ApiDatabaseModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

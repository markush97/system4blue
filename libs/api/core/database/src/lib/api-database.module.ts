import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity, ItemGroupEntity } from '@system4blue/api/items';
import { CheckResultEntity, CheckTemplateEntity } from '@system4blue/checks';
@Global()
@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [TypeOrmModule.forRoot({
    "type": "mariadb",
    "host": "localhost",
    "port": 3306,
    "username": "system4blue",
    "password": "system4blue",
    "database": "system4blue",
    entities: [ItemEntity, ItemGroupEntity, CheckResultEntity, CheckTemplateEntity],
    synchronize: true

  })]
})
export class ApiDatabaseModule {}

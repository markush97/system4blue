import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ItemEntity,
  ItemGroupEntity,
} from '@system4blue/api/items';
import {
  CheckResultEntity,
  CheckRunEntity,
  CheckTemplateEntity,
} from '@system4blue/api/checks';
import { MemberEntity } from '@system4blue/api/members';
import { PartnerEntity } from '@system4blue/api/partners';
import { StorageContainerEntity } from '@system4blue/api/storage';

@Global()
@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'mariadb',
      port: 3306,
      username: 'systemblue',
      password: 'systemblue',
      database: 'systemblue',
      entities: [
        ItemEntity,
        ItemGroupEntity,
        CheckRunEntity,
        CheckResultEntity,
        CheckTemplateEntity,
        MemberEntity,
        PartnerEntity,
        StorageContainerEntity
      ],
      synchronize: true,
    }),
  ],
})
export class ApiDatabaseModule {}

import { EntityRepository } from 'typeorm';
import { BasicRepository } from '@system4blue/api/crud';
import { CheckRunEntity } from './check-run.entity';

@EntityRepository(CheckRunEntity)
export class CheckRunRepository extends BasicRepository<CheckRunEntity> {

}

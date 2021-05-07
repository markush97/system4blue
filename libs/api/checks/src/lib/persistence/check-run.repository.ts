import { EntityRepository } from 'typeorm';
import { BasicRepository } from '@system4blue/api/crud';
import { CheckRunEntity } from './check-run.entity';
import { CheckResultEntity } from './check-result.entity';
import { UUID4 } from '@system4blue/types';

@EntityRepository(CheckRunEntity)
export class CheckRunRepository extends BasicRepository<CheckRunEntity> {
  async getByIdForReport(id: UUID4): Promise<CheckResultEntity> {
    return this.repository.findOne(id, {relations: ['template', 'checker', 'responsible', 'checkResults', 'checkResults.item']});
  }

}

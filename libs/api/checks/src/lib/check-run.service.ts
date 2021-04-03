import { Injectable } from '@nestjs/common';
import { CheckRun, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { CheckRunRepository } from './persistence/check-run.repository';

@Injectable()
export class CheckRunService {

  constructor(private readonly checkRunRepository: CheckRunRepository) {}

  async getMany(queryParams: QueryParams<CheckRun>): Promise<PaginationResult<CheckRun>> {
    return this.checkRunRepository.getMany(parseFindManyParams(queryParams));
  }

  async create(run: CheckRun): Promise<CheckRun> {
    return this.checkRunRepository.create(run);
  }

  async delete(id: UUID4): Promise<void> {
    return this.checkRunRepository.deleteOneById(id);
  }

  async getById(id: UUID4): Promise<CheckRun> {
    return this.checkRunRepository.getOneById(id);
  }

  async getByIdForReport(id: UUID4): Promise<CheckRun> {
    return this.checkRunRepository.getByIdForReport(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CheckResult, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { CheckResultRepository } from './persistence/check-result.repository';

@Injectable()
export class CheckResultService {

  constructor(private readonly checkRepository: CheckResultRepository) {}

  async getMany(queryParams: QueryParams<CheckResult>): Promise<PaginationResult<CheckResult>> {
    return this.checkRepository.getMany(parseFindManyParams(queryParams));
  }

  async create(partner: CheckResult): Promise<CheckResult> {
    return this.checkRepository.create(partner);
  }

  async delete(id: UUID4): Promise<void> {
    return this.checkRepository.deleteOneById(id);
  }

  async getById(id: UUID4): Promise<CheckResult> {
    return this.checkRepository.getOneById(id);
  }
}

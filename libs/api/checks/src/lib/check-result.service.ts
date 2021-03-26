import { Injectable } from '@nestjs/common';
import { CheckResult } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { CheckResultRespository } from './persistence/check-result.repository';

@Injectable()
export class CheckResultService {

  constructor(private readonly checkRepository: CheckResultRespository) {}

  async getMany(): Promise<CheckResult[]> {
    return this.checkRepository.findMany();
  }

  async create(check: CheckResult): Promise<CheckResult> {
    return this.checkRepository.create(check);
  }

  async delete(id: UUID4): Promise<void> {
    return this.checkRepository.deleteById(id);
  }

  async getById(id: UUID4): Promise<CheckResult> {
    return this.checkRepository.findById(id);
  }
}

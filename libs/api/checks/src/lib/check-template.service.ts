import { Injectable } from '@nestjs/common';
import { CheckTemplate, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { CheckTemplateRepository } from './persistence/check-template.repository';

const searchAbleFields: (string & keyof CheckTemplate)[] = ['name']

@Injectable()
export class CheckTemplateService {

  constructor(private readonly checkTemplateRepository: CheckTemplateRepository) {}

  async getMany(queryParams: QueryParams<CheckTemplate>): Promise<PaginationResult<CheckTemplate>> {
    return this.checkTemplateRepository.getMany(parseFindManyParams(queryParams, searchAbleFields));
  }

  async create(template: CheckTemplate): Promise<CheckTemplate> {
    return this.checkTemplateRepository.create(template);
  }

  async delete(id: UUID4): Promise<void> {
    return this.checkTemplateRepository.deleteOneById(id);
  }

  async getById(id: UUID4): Promise<CheckTemplate> {
    return this.checkTemplateRepository.getOneById(id);
  }
}

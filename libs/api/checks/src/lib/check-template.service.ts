import { Injectable } from '@nestjs/common';
import { CheckTemplate } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { CheckTemplateRepository } from './entities/check-template.repository';

@Injectable()
export class CheckTemplateService {

  constructor(private readonly checkTemplateRepository: CheckTemplateRepository) {}

  async getMany(): Promise<CheckTemplate[]> {
    return this.checkTemplateRepository.findMany();
  }

  async create(check: CheckTemplate): Promise<CheckTemplate> {
    return this.checkTemplateRepository.create(check);
  }

  async delete(id: UUID4): Promise<void> {
    return this.checkTemplateRepository.deleteById(id);
  }

  async getById(id: UUID4): Promise<CheckTemplate> {
    return this.checkTemplateRepository.findById(id);
  }
}

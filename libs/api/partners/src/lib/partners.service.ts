import { Injectable } from '@nestjs/common';
import { PaginationResult, Partner, QueryParams } from '@system4blue/api-interfaces';
import { PartnerRepository } from './persistence/partner.repository';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';

@Injectable()
export class PartnersService {
  constructor(private readonly partnerRepository: PartnerRepository) {}

  async getMany(queryParams: QueryParams<Partner>): Promise<PaginationResult<Partner>> {
    return this.partnerRepository.getMany(parseFindManyParams(queryParams));
  }

  async create(partner: Partner): Promise<Partner> {
    return this.partnerRepository.create(partner);
  }

  async delete(id: UUID4): Promise<void> {
    return this.partnerRepository.deleteOneById(id);
  }

  async getById(id: UUID4): Promise<Partner> {
    return this.partnerRepository.getOneById(id);
  }
}

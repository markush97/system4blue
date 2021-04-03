import { EntityRepository } from 'typeorm';
import { PartnerEntity } from './partner.entity';
import { BasicRepository } from '@system4blue/api/crud';

@EntityRepository(PartnerEntity)
export class PartnerRepository extends BasicRepository<PartnerEntity> {

}

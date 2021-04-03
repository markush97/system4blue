import { EntityRepository } from 'typeorm';
import { BasicRepository } from '@system4blue/api/crud';
import { MemberEntity } from './members.entity';

@EntityRepository(MemberEntity)
export class MemberRepository extends BasicRepository<MemberEntity> {

}

import { Injectable } from '@nestjs/common';
import { Member, PaginationResult, QueryParams } from '@system4blue/api-interfaces';
import { parseFindManyParams } from '@system4blue/api/crud';
import { UUID4 } from '@system4blue/types';
import { MemberRepository } from './persistence/members.repository';

const searchAbleFields: (string & keyof Member)[] = ['email', 'externalId', 'name'];

@Injectable()
export class MembersService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async getMany(queryParams: QueryParams<Member>): Promise<PaginationResult<Member>> {
    return this.memberRepository.getMany(parseFindManyParams(queryParams, searchAbleFields));
  }

  async create(partner: Member): Promise<Member> {
    return this.memberRepository.create(partner);
  }

  async delete(id: UUID4): Promise<void> {
    return this.memberRepository.deleteOneById(id);
  }

  async getById(id: UUID4): Promise<Member> {
    return this.memberRepository.getOneById(id);
  }

}

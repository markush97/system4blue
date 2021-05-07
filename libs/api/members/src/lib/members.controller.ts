import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member, PaginationResult, QueryParams } from '@system4blue/api-interfaces'
import { UUID4 } from '@system4blue/types';
import { PartialUpdate } from '@system4blue/api/validation';
import { MemberDto } from './dto/member.dto';
import { OutMemberDto } from './dto/out.member.dto';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

    @Post()
    async create(@Body() member: MemberDto): Promise<OutMemberDto> {
      return this.membersService.create(member);
    }

    @Get(':id')
    async getById(@Param('id') id: UUID4): Promise<OutMemberDto> {
      return this.membersService.getById(id);
    }

    @Get()
    async getMany(@Query() queryParams: QueryParams<Member>): Promise<PaginationResult<OutMemberDto>> {
      return this.membersService.getMany(queryParams);
    }

    @Put(':id')
    @PartialUpdate()
    async update(@Param('id') id: UUID4, @Body() member: MemberDto): Promise<void> {
      return this.membersService.update(id, member)
    }

    @Delete(':id')
    async delete(@Param('id') id: UUID4): Promise<void> {
      return this.membersService.delete(id);
    }

}

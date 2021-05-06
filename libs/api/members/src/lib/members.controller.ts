import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member, PaginationResult, QueryParams } from '@system4blue/api-interfaces'
import { UUID4 } from '@system4blue/types';
@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

    @Post()
    async create(@Body() member: Member): Promise<Member> {
      return this.membersService.create(member);
    }

    @Get(':id')
    async getById(@Param('id') id: UUID4): Promise<Member> {
      return this.membersService.getById(id);
    }

    @Get()
    async getMany(@Query() queryParams: QueryParams<Member>): Promise<PaginationResult<Member>> {
      return this.membersService.getMany(queryParams);
    }

    @Put(':id')
    async update(@Param('id') id: UUID4, @Body() member: Member): Promise<void> {
      return this.membersService.update(id, member)
    }

    @Delete(':id')
    async delete(@Param('id') id: UUID4): Promise<void> {
      return this.membersService.delete(id);
    }

}

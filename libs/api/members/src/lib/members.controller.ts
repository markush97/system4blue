import { Body, Controller, Post } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from '@system4blue/api-interfaces'
@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

    @Post()
    async create(@Body() member: Member): Promise<Member> {
      return this.membersService.create(member);
    }

}

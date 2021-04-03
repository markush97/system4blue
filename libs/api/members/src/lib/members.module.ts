import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MemberRepository } from './persistence/members.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService],
  imports: [TypeOrmModule.forFeature([MemberRepository])]
})
export class MembersModule {}

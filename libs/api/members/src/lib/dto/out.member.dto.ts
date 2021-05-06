import { Member } from "@system4blue/api-interfaces";
import { UUID4 } from "@system4blue/types";

export class MemberDto implements Member {
  id?: UUID4;

  firstName?: string;
  lastName?: string;

  memberId?: string;

  street?: string;
  country?: string;
  zip?: number;

  email?: string;
  phone?: string;
  privateEmail?: string;

  createdAt?: string;
  updatedAt?: string;

  constructor(member: Member) {
    Object.assign(this, member);
  }
}

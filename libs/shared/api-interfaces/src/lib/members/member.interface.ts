import { UUID4 } from "@system4blue/types";

export interface Member {
  id: UUID4;

  firstName: string;
  lastName: string;

  memberId: string;

  street?: string;
  country?: string;
  zip?: number;

  email: string;
  phone?: string;

  createdAt: string;
  updatedAt: string;
}

import { UUID4 } from "@system4blue/types";

export interface Partner {
  id: UUID4;

  name: string;

  street?: string;
  country?: string;
  zip?: number;

  contactPhone?: string;
  contactName?: string;
  contactEmail?: string;

  webpage?: string;

  description?: string;

  createdAt: string;
  updatedAt: string;
}

import { Partner } from "@system4blue/api-interfaces";

export class OutPartnerDto implements Partner {
  name?: string;

  street?: string;

  country?: string;

  zip?: number;

  contactPhone?: string;

  contactName?: string;

  contactEmail?: string;

  webpage?: string;

  description?: string;

  constructor(partner: Partner) {
    Object.assign(this, partner);
  }
}

import { UUID4 } from "@system4blue/types";
export interface CheckTemplate {
  id: UUID4;
  name: string;

  checks: string[];

  description?: string;

  createdAt: string;
  updatedAt: string;
}

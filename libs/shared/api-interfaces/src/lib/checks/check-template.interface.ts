import { UUID4 } from "@system4blue/types";
import { CheckResult } from "./check-result.interface";

export interface CheckTemplate {
  id: UUID4;
  name: string;

  checks: string[];

  checkResults: CheckResult[];

  notice?: string;
  description?: string;

  createdAt: string;
  updatedAt: string;
}

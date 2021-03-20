import { UUID4 } from "@system4blue/types";
import { CheckResult } from "./check-result.interface";
import { CheckTemplate } from "./check-template.interface";

export interface CheckRun {
  id: UUID4;

  checker: string;
  date: string;

  template: CheckTemplate;

  checkResults: CheckResult[];

  note?: string;

  createdAt: string;
  updatedAt: string;
}

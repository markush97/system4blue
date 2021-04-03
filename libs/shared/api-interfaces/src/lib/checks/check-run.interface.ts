import { UUID4 } from "@system4blue/types";
import { Member } from "../members";
import { Partner } from "../partners";
import { CheckResult } from "./check-result.interface";
import { CheckTemplate } from "./check-template.interface";

export interface CheckRun {
  id: UUID4;

  checker: Member;

  responsible: Member;

  date: string;

  template: CheckTemplate;

  checkResults: CheckResult[];

  note?: string;

  createdAt: string;
  updatedAt: string;
}

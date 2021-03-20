import { UUID4 } from "@system4blue/types";
import { Item } from "../items";
import { CheckRun } from "./check-run.interface";

export interface CheckResult {
  id: UUID4;

  successfullChecks: string[];
  failedChecks: string[];

  item: Item;

  checkRun: CheckRun;

  note?: string;

  createdAt: string;
  updatedAt: string;
}

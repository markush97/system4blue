import { UUID4 } from "@system4blue/types";
import { Item } from "../items";

export interface CheckResult {
  id: UUID4;

  successfullChecks: string[];
  failedChecks: string[];

  item: Item;

  note?: string;

  createdAt: string;
  updatedAt: string;
}

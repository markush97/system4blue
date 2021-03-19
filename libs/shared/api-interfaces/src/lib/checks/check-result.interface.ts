import { UUID4 } from "@system4blue/types";
import { Item } from "../items";
import { CheckTemplate } from "./check-template.interface";

export interface CheckResult {
  id: UUID4;
  checker: string;
  date: string;
  successfullChecks: string[];
  failedChecks: string[];
  template: CheckTemplate;
  notice?: string;
  item: Item;
  itemId: string;
  templateId: string;

}

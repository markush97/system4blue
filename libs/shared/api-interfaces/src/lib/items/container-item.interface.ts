import { Unit } from "../unit.enum";

export interface ContainerItem {
  minAmount?: number;
  maxAmount: number;
  unit: Unit;

  amount: number;
}

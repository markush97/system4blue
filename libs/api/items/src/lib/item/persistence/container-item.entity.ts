import { ContainerItem, Unit } from "@system4blue/api-interfaces";
import { ChildEntity, Column } from "typeorm";
import { ItemEntity } from "./item.entity";

@ChildEntity()
export class ContainerItemEntity extends ItemEntity implements ContainerItem {

  @Column({default: 0})
  minAmount?: number;

  @Column({nullable: true})
  maxAmount: number;

  @Column({type: 'enum', enum: Unit})
  unit: Unit;

  @Column()
  amount: number;

}

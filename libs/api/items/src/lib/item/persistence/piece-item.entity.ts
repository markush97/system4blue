import { PieceItem } from "@system4blue/api-interfaces";
import { ChildEntity } from "typeorm";
import { ItemEntity } from "./item.entity";

@ChildEntity()
export class PieceItemEntity extends ItemEntity implements PieceItem {

}

import { UUID4 } from "@system4blue/types";
import { Item } from "../items";
import { StorageType } from "./storage-types.enum";

export interface StorageContainer {
  id: UUID4;
  name: string;
  type: StorageType;
  description?: string;
  subContainers: StorageContainer[];
  parentContainer: StorageContainer | 'root';
  items: Item[];
  createdAt: string;
  updatedAt: string;
}

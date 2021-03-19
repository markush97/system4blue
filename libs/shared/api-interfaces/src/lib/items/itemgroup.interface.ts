import {unit, UUID4} from '@system4blue/types';
import { Item } from './item.interface';

export interface ItemGroup {
  id: UUID4;
  name: string;
  description?: string;
  expiration?: string;
  location?: string;
  unit: unit;
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  items?: Item[];
  defaultLifespan?: number;
  price?: number;

}

import {UUID4} from '@system4blue/types';
import { ItemGroup } from './itemgroup.interface';

export interface Item {
  id: UUID4;
  name: string;
  description?: string;
  price?: number;
  expiration?: string;
  location?: string;
  itemGroup?: ItemGroup;

}

import {unit, UUID4} from '@system4blue/types';
import { CheckTemplate } from '../checks';
import { Item } from './item.interface';

export interface ItemGroup {
  id: UUID4;
  name: string;

  description?: string;

  minAmount?: number;
  maxAmount?: number;
  unit?: unit;

  defaultLifespan?: number;

  seller: string;
  producer: string;

  pricePerUnit?: number;

  checkTemplate?: CheckTemplate;

  items?: Item[];

  createdAt: string;
  updatedAt: string;

}

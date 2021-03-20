import {UUID4} from '@system4blue/types';
import { CheckTemplate } from '../checks';
import { Partner } from '../partners/partner.interface';
import { Unit } from '../unit.enum';
import { Item } from './item.interface';

export interface ItemGroup {
  id: UUID4;
  name: string;

  description?: string;

  minAmount?: number;
  maxAmount?: number;
  unit?: Unit;

  defaultLifespan?: number;

  seller?: Partner;
  producer?: Partner;

  pricePerUnit?: number;

  checkTemplate?: CheckTemplate;

  items?: Item[];

  createdAt: string;
  updatedAt: string;

}

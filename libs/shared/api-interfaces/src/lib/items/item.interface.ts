import { UUID4 } from '@system4blue/types';
import { CheckResult } from '../checks';
import { ItemGroup } from './itemgroup.interface';

export interface Item {
  id: UUID4;
  externalId: string;
  name: string;
  description?: string;
  price?: number;
  expiration?: string;
  location?: string;
  itemGroup?: ItemGroup;
  checks: CheckResult[];

}

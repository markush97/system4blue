import { UUID4 } from '@system4blue/types';
import { CheckResult } from '../checks';
import { ItemGroup } from './itemgroup.interface';
import { StorageContainer } from '../storage/storage-container.interface';
import { ItemState } from './item-state.enum';

export interface Item {
  id: UUID4;
  externalId: string;

  name: string;

  description?: string;

  price?: number;

  expiration?: string;

  producedAt?: string;
  producer?: string;

  seller: string;

  storageLocation?: StorageContainer;

  itemGroup?: ItemGroup;
  checkResults: CheckResult[];

  state: ItemState;

  createdAt: string;
  updatedAt: string;
}

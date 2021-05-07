import { Item, StorageContainer, StorageType } from '@system4blue/api-interfaces';
import { Expose } from 'class-transformer';
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional, IsEnum, ValidateNested, IsInstance, Allow } from 'class-validator';


export class StorageContainerOutDto implements StorageContainer {

  id?: string;

  type?: StorageType;

  description?: string;

  subContainers?: StorageContainer[];

  parentContainer?: StorageContainer | "root";

  items?: Item[];

  createdAt?: string;

  updatedAt?: string;

  name?: string;

  ancestors?: StorageContainer[];

  @Expose()
  get path(): string[] {
    const path: string[] = [];

    this.ancestors?.forEach((ancestor) => path.push(ancestor.name));

    return path;
  }

  constructor(container: Partial<StorageContainer & {ancestors: StorageContainer[]}>) {
    Object.assign(this, container);
  }
}

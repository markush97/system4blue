import { All } from '@nestjs/common';
import { CheckResult, CheckTemplate, Item, ItemGroup, ItemState, Partner, StorageContainer, StorageType } from '@system4blue/api-interfaces';
import { Expose } from 'class-transformer';
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional, IsEnum, ValidateNested, IsInstance, Allow, IsNumber, IsDateString, IsArray } from 'class-validator';

export class ItemOutDto implements Item {
  externalId?: string;

  name?: string;

  description?: string;

  price?: number;

  expiration?: string;

  producedAt?: string;

  producer?: Partner;

  seller?: Partner;

  storageLocation?: StorageContainer;

  itemGroup?: ItemGroup;

  checkTemplate?: CheckTemplate;

  checkResults?: CheckResult[];

  state?: ItemState;

  createdAt?: string;

  updatedAt?: string;

  id?: string;

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}

import { All } from '@nestjs/common';
import { CheckResult, CheckTemplate, Item, ItemGroup, ItemState, Partner, StorageContainer, StorageType, Unit } from '@system4blue/api-interfaces';
import { Expose } from 'class-transformer';
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional, IsEnum, ValidateNested, IsInstance, Allow, IsNumber, IsDateString, IsArray } from 'class-validator';

export class ItemGroupOutDto implements ItemGroup {

  id?: string;

  unit?: Unit;

  items?: Item[];

  @Expose()
  get numberItems(): number {
    return this.items?.length;
  }

  @Expose()
  get totalAmount(): number {
    return this.items?.reduce<number>(((total, item) => total + item.amount), 0);
  }

  name?: string;

  description?: string;

  minAmount?: number;

  maxAmount?: number;

  defaultLifespan?: number;

  seller?: Partner;

  producer?: Partner;

  pricePerUnit?: number;

  checkTemplate?: CheckTemplate;

  createdAt?: string;

  updatedAt?: string;

  constructor(itemGroup: Partial<ItemGroup>) {
    Object.assign(this, itemGroup);
  }
}

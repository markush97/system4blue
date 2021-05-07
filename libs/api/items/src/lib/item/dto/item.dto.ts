import { All } from '@nestjs/common';
import { CheckResult, CheckTemplate, Item, ItemGroup, ItemState, Partner, StorageContainer, StorageType } from '@system4blue/api-interfaces';
import { Expose } from 'class-transformer';
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional, IsEnum, ValidateNested, IsInstance, Allow, IsNumber, IsDateString, IsArray } from 'class-validator';

export class ItemDto implements Item {
  @IsAlphanumeric()
  externalId?: string;

  @IsAlphanumeric()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price?: number;

  @IsDateString({strict: true})
  expiration?: string;

  @IsDateString({strict: true})
  producedAt?: string;

  // TODO: prolly a string with Id aswell
  @Allow()
  producer?: Partner;

  @Allow()
  seller?: Partner;

  @Allow()
  storageLocation?: StorageContainer;

  @Allow()
  itemGroup?: ItemGroup;

  @Allow()
  checkTemplate?: CheckTemplate;

  @IsArray()
  checkResults?: CheckResult[];

  @IsEnum(ItemState)
  state?: ItemState;
}

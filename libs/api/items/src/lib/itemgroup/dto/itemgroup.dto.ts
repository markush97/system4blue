import { All } from '@nestjs/common';
import { CheckResult, CheckTemplate, Item, ItemGroup, ItemState, Partner, StorageContainer, StorageType, Unit } from '@system4blue/api-interfaces';
import { Expose } from 'class-transformer';
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional, IsEnum, IsInstance, Allow, IsNumber, IsDateString, IsArray, Min, Max, ValidateIf, IsPositive } from 'class-validator';

export class ItemGroupDto implements ItemGroup {

  @IsEnum(Unit)
  unit?: Unit;

  @IsAlphanumeric()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minAmount?: number;

  @IsOptional()
  @Min(0)
  @ValidateIf((o: ItemGroupDto) => o.minAmount > o.maxAmount)
  @Max(-1, {message: 'Min amount has to be bigger then Max amount'})
  maxAmount?: number;

  @IsPositive()
  defaultLifespan?: number;

  @Allow()
  seller?: Partner;

  @Allow()
  producer?: Partner;

  @IsPositive()
  pricePerUnit?: number;

  @Allow()
  checkTemplate?: CheckTemplate;
}

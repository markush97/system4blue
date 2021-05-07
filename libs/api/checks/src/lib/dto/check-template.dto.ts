import { All } from '@nestjs/common';
import { CheckResult, CheckTemplate, Item, ItemGroup, ItemState, Partner, StorageContainer, StorageType, Unit } from '@system4blue/api-interfaces';
import { Expose, Type } from 'class-transformer';
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional, IsEnum, IsInstance, Allow, IsNumber, IsDateString, IsArray, Min, Max, ValidateIf, IsPositive, NotContains } from 'class-validator';

export class CheckTemplateDto implements CheckTemplate {
  @IsAlphanumeric()
  name?: string;

  @Type(() => String)
  @NotContains(',', {each: true})
  checks?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}

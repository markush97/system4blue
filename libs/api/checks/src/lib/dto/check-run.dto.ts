import { All } from '@nestjs/common';
import { CheckResult, CheckRun, CheckTemplate, Item, ItemGroup, ItemState, Member, Partner, StorageContainer, StorageType, Unit } from '@system4blue/api-interfaces';
import { Expose, Type } from 'class-transformer';
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional, IsEnum, IsInstance, Allow, IsNumber, IsDateString, IsArray, Min, Max, ValidateIf, IsPositive, ValidateNested } from 'class-validator';
import { CheckResultDto } from './check-result.dto';

export class CheckRunDto implements CheckRun {
  @Allow()
  checker?: Member;

  @Allow()
  responsible?: Member;

  @IsDateString({strict: true})
  date?: string;

  @Allow()
  template?: CheckTemplate;

  @ValidateNested({each: true})
  checkResults?: CheckResultDto[];

  @IsOptional()
  @IsString()
  note?: string;
}

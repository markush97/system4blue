import { Partner } from "@system4blue/api-interfaces";
import { IsAlpha, IsEmail, IsISO31661Alpha2, IsOptional, IsPhoneNumber, IsPostalCode, IsString, IsUrl } from 'class-validator';

export class PartnerDto implements Partner {
  @IsAlpha()
  name: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsISO31661Alpha2()
  country?: string;

  @IsOptional()
  @IsPostalCode()
  zip?: number;

  @IsOptional()
  @IsPhoneNumber()
  contactPhone?: string;

  @IsOptional()
  @IsAlpha()
  contactName?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsUrl()
  webpage?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

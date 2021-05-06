
import { Member } from "@system4blue/api-interfaces";
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional } from 'class-validator';

export class SaveMemberDto implements Member {
  @IsOptional({groups: ['update']})
  @IsAlpha()
  firstName: string;

  @IsOptional({groups: ['update']})
  @IsAlpha()
  lastName: string;

  @IsOptional({groups: ['update']})
  @IsAlphanumeric()
  memberId: string;

  @IsOptional({groups: ['update']})
  @IsEmail()
  email: string;

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
  phone?: string;

  @IsOptional()
  @IsEmail()
  privateEmail?: string;

}

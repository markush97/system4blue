import { StorageContainer, StorageType } from '@system4blue/api-interfaces';
import { IsAlpha, IsAlphanumeric, IsEmail, IsISO31661Alpha2, IsPhoneNumber, IsPostalCode, IsString, IsOptional, IsEnum, ValidateNested, IsInstance, Allow } from 'class-validator';

export class StorageContainerDto implements StorageContainer {

  @IsEnum(StorageType)
  type: StorageType;

  @IsString()
  description?: string;

  // TODO: this will probably be an UUID instead of the actual object
  @Allow()
  parentContainer: StorageContainer | "root";

  @IsAlphanumeric()
  name: string;
}

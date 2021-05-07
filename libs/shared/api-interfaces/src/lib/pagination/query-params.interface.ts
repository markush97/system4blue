import { Type } from 'class-transformer';


/* eslint-disable @typescript-eslint/ban-types */
export class QueryParams<T extends object = object> {

  @Type(() => String)
  fields?: (keyof T & string)[];

  @Type(() => String)
  filters?: FilterParam<T>[];

  order?: OrderParam<T>[];

  @Type(() => String)
  relations?: string[];

  limit?: number;
  page?: number;
  search?: string;
}

export type FilterCondition = 'eq' | 'ne' | 'gt' | 'lt' | 'lte' | 'gte' | 'starts' | 'ends' | 'cont' | 'ncont';
export type FilterParam<T extends object> = `${string & keyof T}||${FilterCondition}||${string}`;
export type OrderParam<T extends object> = `${string & keyof T}||${'ASC' | 'DESC'}`;

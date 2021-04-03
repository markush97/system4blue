/* eslint-disable @typescript-eslint/ban-types */
export interface QueryParams<T extends object> {
  //fields?: (keyof T)[];
  //filter?: FilterParam<T>[];
  //or?: FilterParam<T>[];
  //order?: orderParam<T>[];
  //relations?: string[];

  fields?: string;
  filter?: string;
  order?: string;
  relations?: string;
  limit?: number;
  page?: number;
}

export type FilterCondition = 'eq' | 'ne' | 'gt' | 'lt' | 'starts' | 'ends' | 'cont';
export type FilterParam<T extends object> = `${string & keyof T}||${FilterCondition}||${string}`;
export type OrderParam<T extends object> = `${string & keyof T}||${'ASC' | 'DESC'}`;

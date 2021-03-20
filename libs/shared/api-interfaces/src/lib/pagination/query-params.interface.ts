export interface QueryParams<T extends Record<string, unknown>> {
  fields?: (keyof T) | (keyof T)[];
  filter?: string | string[];
  or?: string | string[];
  sort?: string[];
  relations?: string | string[];
  limit?: number;
  page?: number;
}

declare const FilterConditions: 'eq' | 'ne' | 'gt' | 'lt' | 'starts' | 'ends' | 'cont';

declare const Filters = `${string}||${FilterConditions}||${string}` as const;



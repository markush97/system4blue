export interface QueryParams<T extends Record<string, unknown>> {
  fields?: (keyof T) | (keyof T)[];
  filter?: FilterParam<T> | FilterParam<T>[];
  or?: FilterParam<T> | FilterParam<T>[];
  sort?: SortParam<T> | SortParam<T>[];
  relations?: string | string[];
  limit?: number;
  page?: number;
}

type FilterCondition = 'eq' | 'ne' | 'gt' | 'lt' | 'starts' | 'ends' | 'cont';
type FilterParam<T extends Record<string, unknown>> = `${string & keyof T}||${FilterCondition}||${string}`;
type SortParam<T extends Record<string, unknown>> = `${string & keyof T}||${'asc' | 'dsc'}`;

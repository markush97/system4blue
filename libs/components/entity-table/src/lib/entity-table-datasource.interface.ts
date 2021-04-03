/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterParam, PaginationResult } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface EntityTableDataSource<E extends object = any> {
  loadEntites(
    searchString?: string,
    page?: number,
    limit?: number,
    sortByField?: (keyof E),
    sortOrder?: 'ASC' | 'DESC',
    filters?: FilterParam<E>[]
  ): Promise<PaginationResult<E>>;

  deleteEntity(id: UUID4): void;
  editEntity(id: UUID4): void;
  showEntity(id: UUID4): void;
  addEntity(): void;
}

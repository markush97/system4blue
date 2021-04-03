import { HttpParams } from '@angular/common/http';
import { FilterParam } from '@system4blue/api-interfaces';

export function composeHttpPagingParams(searchString?: string,
  page?: number,
  limit?: number,
  sortByField?: string,
  sortOrder: 'ASC' | 'DESC' = 'ASC',
  filters?: FilterParam<any>[]): HttpParams {
  let httpParams = new HttpParams();

  if (limit !== undefined) {
    httpParams = httpParams.set('limit', limit.toString());
  }

  if (page !== undefined) {
    httpParams = httpParams.set('page', page.toString());
  }

  if (sortByField !== undefined) {
    httpParams = httpParams.set('order', `${sortByField}||${sortOrder}`);
  }

  if (searchString !== undefined) {
    httpParams = httpParams.set('search', searchString);
  }

  if (filters !== undefined && filters.length > 0) {
    httpParams = httpParams.set('filters', filters.join(','));
  }

  return httpParams;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FilterParam,
  PaginationResult,
  Partner,
} from '@system4blue/api-interfaces';
import {
  EntityTableDataSource,
  composeHttpPagingParams,
} from '@system4blue/components';

@Injectable({
  providedIn: 'root',
})
export class AdminPartnersService implements EntityTableDataSource {
  constructor(private readonly http: HttpClient) {}

  async loadEntites(
    searchString?: string,
    page?: number,
    limit?: number,
    sortByField?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filters?: FilterParam<any>[]
  ): Promise<PaginationResult<Partner>> {
    return this.http
      .get<PaginationResult<Partner>>('/api/partners', {
        params: composeHttpPagingParams(
          searchString,
          page,
          limit,
          sortByField,
          sortOrder,
          filters
        ),
      })
      .toPromise();
  }

  async deleteEntity(id: string): Promise<void> {
    this.http.delete(`/api/partners/${id}`).subscribe();
  }

  editEntity(id: string): void {
    throw new Error('Method not implemented.');
  }
  showEntity(id: string): void {
    throw new Error('Method not implemented.');
  }

  addEntity(): void {
    throw new Error('Method not implemented.');
  }
}

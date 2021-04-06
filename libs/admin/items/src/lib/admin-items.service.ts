import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, PaginationResult } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';

@Injectable({
  providedIn: 'root',
})
export class AdminItemsService {
  private readonly PATH = '/api/item';

  constructor(private readonly http: HttpClient) {}

  async loadItemsInStorage(containerId: UUID4): Promise<PaginationResult<Item>> {
    return this.http
      .get<PaginationResult<Item>>(this.PATH, {
        params: new HttpParams().set('filters', `storageLocation||eq||${containerId}`).set('relations', 'itemGroup'),
      })
      .toPromise();
  }
}

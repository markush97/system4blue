import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, ItemGroup } from '@system4blue/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemslistService {
  constructor(private readonly http: HttpClient) {

  }

  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/item');
  }

  public getItemGroups(): Observable<ItemGroup[]> {
    return this.http.get<ItemGroup[]>('/api/itemgroup');
  }
}

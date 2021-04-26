import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterParam, Item, ItemGroup, PaginationResult } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import {
  EntityTableDataSource,
  composeHttpPagingParams,
} from '@system4blue/components';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs/operators';
import { ItemGroupFormComponent } from './item-group-form/item-group-form.component';

@Injectable({
  providedIn: 'root',
})
export class AdminItemsService {
  private readonly PATH = '/api/items';
  private readonly GROUPPATH = '/api/itemgroup';

  private ref!: DynamicDialogRef;

  constructor(
    private readonly http: HttpClient,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {}

  async loadItemGroupWithItems(
    searchString?: string,
    page?: number,
    limit?: number,
    sortByField?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filters?: FilterParam<any>[]
  ): Promise<PaginationResult<ItemGroup>> {
    let params =  composeHttpPagingParams(
      searchString,
      page,
      limit,
      sortByField,
      sortOrder,
      filters
    );

    params = params.set('relations', 'items');

    return this.http
      .get<PaginationResult<ItemGroup>>(this.GROUPPATH, {
        params: params
      })
      .toPromise();
  }

  async loadItemsInStorage(containerId: UUID4): Promise<PaginationResult<Item>> {
    return this.http
      .get<PaginationResult<Item>>(this.PATH, {
        params: new HttpParams().set('filters', `storageLocation||eq||${containerId}`).set('relations', 'itemGroup'),
      })
      .toPromise();
  }

  async loadItemGroups(
    searchString?: string,
    page?: number,
    limit?: number,
    sortByField?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filters?: FilterParam<any>[]
  ): Promise<PaginationResult<ItemGroup>> {
    return this.http
      .get<PaginationResult<ItemGroup>>(this.GROUPPATH, {
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

  async deleteItemGroup(id: string): Promise<void> {
    this.http
      .delete(`${this.GROUPPATH}/${id}`)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `Itemgruppe wurde gelöscht`,
            life: 3000,
          });
        })
      )
      .subscribe();
  }

  async editItemGroup(id: string) {
    const itemGroup = await this.getItemGroup(id);

    this.ref = this.dialogService.open(ItemGroupFormComponent, {
      header: 'Gegenstandsgruppe Information',
      dismissableMask: true,
      width: '70%',
      closeOnEscape: true,
      data: {
        itemGroup: itemGroup,
      },
    });
  }

  async showItemGroup(id: string) {
    await this.editItemGroup(id);
  }

  addItemGroup(): void {
    this.ref = this.dialogService.open(ItemGroupFormComponent, {
      header: 'Neue Itemgruppe anlegen',
      width: '70%',
      dismissableMask: true,
      closeOnEscape: true,
    });
  }

  async createItemGroup(itemGroup: ItemGroup): Promise<ItemGroup> {
    return this.http
      .post<ItemGroup>(this.GROUPPATH, itemGroup)
      .pipe(
        tap((itemGroup: ItemGroup) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `${itemGroup.name} wurde angelegt`,
            life: 3000,
          });
          this.ref.close();
        })
      )
      .toPromise();
  }

  async updateItemGroup(itemGroupId: UUID4, itemGroup: ItemGroup) {
    this.http
      .put(`${this.GROUPPATH}/${itemGroupId}`, itemGroup)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `${itemGroup.name} wurde aktualisiert`,
            life: 3000,
          });
          this.ref.close();
        })
      )
      .subscribe();
  }

  async getItemGroup(itemGroupId: UUID4): Promise<ItemGroup> {
    return this.http.get<ItemGroup>(`${this.GROUPPATH}/${itemGroupId}`).toPromise();
  }


}

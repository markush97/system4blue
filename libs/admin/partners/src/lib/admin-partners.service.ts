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
import { UUID4 } from '@system4blue/types';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminPartnersFormComponent } from './admin-partners-form/admin-partners-form.component';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminPartnersService implements EntityTableDataSource {
  private readonly PATH = '/api/partners';

  private ref!: DynamicDialogRef;

  constructor(
    private readonly http: HttpClient,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {}

  async loadEntites(
    searchString?: string,
    page?: number,
    limit?: number,
    sortByField?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filters?: FilterParam<any>[]
  ): Promise<PaginationResult<Partner>> {
    return this.http
      .get<PaginationResult<Partner>>(this.PATH, {
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
    this.http
      .delete(`${this.PATH}/${id}`)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `Partner wurde gelöscht`,
            life: 3000,
          });
        })
      )
      .subscribe();
  }

  async editEntity(id: string) {
    const partner = await this.getPartner(id);

    this.ref = this.dialogService.open(AdminPartnersFormComponent, {
      header: 'Partner Information',
      dismissableMask: true,
      closeOnEscape: true,
      data: {
        partner: partner,
      },
    });
  }

  async showEntity(id: string) {
    await this.editEntity(id);
  }

  addEntity(): void {
    this.ref = this.dialogService.open(AdminPartnersFormComponent, {
      header: 'Neuen Partner anlegen',
      dismissableMask: true,
      closeOnEscape: true,
    });
  }

  async createPartner(partner: Partner): Promise<Partner> {
    return this.http
      .post<Partner>(this.PATH, partner)
      .pipe(
        tap((partner: Partner) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `${partner.name} wurde angelegt`,
            life: 3000,
          });
          this.ref.close();
        })
      )
      .toPromise();
  }

  async updatePartner(partnerId: UUID4, partner: Partner) {
    this.http
      .put(`${this.PATH}/${partnerId}`, partner)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `${partner.name} wurde aktualisiert`,
            life: 3000,
          });
          this.ref.close();
        })
      )
      .subscribe();
  }

  async getPartner(partnerId: UUID4): Promise<Partner> {
    return this.http.get<Partner>(`${this.PATH}/${partnerId}`).toPromise();
  }
}

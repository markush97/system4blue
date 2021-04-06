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
import { DialogService } from 'primeng/dynamicdialog';
import { AdminPartnersFormComponent } from './admin-partners-form/admin-partners-form.component';

@Injectable({
  providedIn: 'root',
})
export class AdminPartnersService implements EntityTableDataSource {
  constructor(private readonly http: HttpClient, private readonly dialogService: DialogService) {}

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

  async editEntity(id: string) {
    const partner = await this.getPartner(id);

    const ref = this.dialogService.open(AdminPartnersFormComponent, {
      header: 'Partner Information',
      width: '55%',
      closeOnEscape: true,
      data: {
        partner: partner
      }
    })
  }

  async showEntity(id: string) {
    await this.editEntity(id);
  }

  addEntity(): void {
    const ref = this.dialogService.open(AdminPartnersFormComponent, {
      header: 'Neuen Partner anlegen',
      width: '55%',
      dismissableMask: true,
      closeOnEscape: true
    })
  }

  async createPartner(partner: Partner): Promise<Partner> {
    return this.http.post<Partner>('/api/partners', partner).toPromise();
  }

  async updatePartner(partnerId: UUID4, partner: Partner): Promise<Partner> {
    return this.http.put<Partner>(`/api/partners/${partnerId}`, partner).toPromise();
  }

  async getPartner(partnerId: UUID4): Promise<Partner> {
    return this.http.get<Partner>(`/api/partners/${partnerId}`).toPromise();
  }
}

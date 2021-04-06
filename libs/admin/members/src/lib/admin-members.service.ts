import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FilterParam,
  Member,
  PaginationResult,
} from '@system4blue/api-interfaces';
import {
  composeHttpPagingParams,
  EntityTableDataSource,
} from '@system4blue/components';
import { UUID4 } from '@system4blue/types';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminMembersFormComponent } from './admin-members-form/admin-members-form.component';

@Injectable({
  providedIn: 'root',
})
export class AdminMembersService implements EntityTableDataSource {
  private readonly PATH = '/api/members';

  constructor(
    private readonly http: HttpClient,
    private readonly dialogService: DialogService
  ) {}
  loadEntites(
    searchString?: string,
    page?: number,
    limit?: number,
    sortByField?: string,
    sortOrder?: 'ASC' | 'DESC',
    filters?: FilterParam<any>[]
  ): Promise<PaginationResult<any>> {
    return this.http
      .get<PaginationResult<Member>>(this.PATH, {
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
    this.http.delete(`${this.PATH}/${id}`).subscribe();
  }

  async editEntity(id: string) {
    const member = await this.getMember(id);

    const ref = this.dialogService.open(AdminMembersFormComponent, {
      header: 'Mitglied Information',
      width: '55%',
      closeOnEscape: true,
      dismissableMask: true,
      data: {
        member: member,
      },
    });
  }

  async showEntity(id: string) {
    await this.editEntity(id);
  }

  addEntity(): void {
    const ref = this.dialogService.open(AdminMembersFormComponent, {
      header: 'Neues Mitglied anlegen',
      width: '55%',
      dismissableMask: true,
      closeOnEscape: true,
    });
  }

  async createMember(member: Member): Promise<Member> {
    return this.http.post<Member>(this.PATH, member).toPromise();
  }

  async updateMember(memberId: UUID4, member: Member): Promise<Member> {
    return this.http.put<Member>(`${this.PATH}/${memberId}`, member).toPromise();
  }

  async getMember(memberId: UUID4): Promise<Member> {
    return this.http.get<Member>(`${this.PATH}/${memberId}`).toPromise();
  }
}

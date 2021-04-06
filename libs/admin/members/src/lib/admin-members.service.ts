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
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminMembersFormComponent } from './admin-members-form/admin-members-form.component';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminMembersService implements EntityTableDataSource {
  private readonly PATH = '/api/members';

  private ref!:DynamicDialogRef;

  constructor(
    private readonly http: HttpClient,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
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

    this.ref = this.dialogService.open(AdminMembersFormComponent, {
      header: 'Mitglied Information',
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
    this.ref = this.dialogService.open(AdminMembersFormComponent, {
      header: 'Neues Mitglied anlegen',
      dismissableMask: true,
      closeOnEscape: true,
    });
  }

  async createMember(member: Member): Promise<Member> {
    return this.http.post<Member>(this.PATH, member)      .pipe(
      tap((member: Member) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Erfolg!',
          detail: `${member.firstName} ${member.lastName} wurde angelegt`,
          life: 3000,
        });
        this.ref.close();
      })
    ).toPromise();
  }

  async updateMember(memberId: UUID4, member: Member) {
    this.http.put<Member>(`${this.PATH}/${memberId}`, member).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Erfolg!',
          detail: `${member.firstName} ${member.lastName} wurde aktualisiert`,
          life: 3000,
        });
        this.ref.close();
      })
    ).subscribe();
  }

  async getMember(memberId: UUID4): Promise<Member> {
    return this.http.get<Member>(`${this.PATH}/${memberId}`).toPromise();
  }
}

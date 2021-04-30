import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckRun,
  FilterParam,
  PaginationResult,
} from '@system4blue/api-interfaces';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, tap } from 'rxjs/operators';
import { UUID4 } from '@system4blue/types';
import { CheckRunFormComponent } from './check-run-form/check-run-form.component';
import {
  composeHttpPagingParams,
  EntityTableDataSource,
} from '@system4blue/components';

@Injectable({
  providedIn: 'root',
})
export class AdminChecksRunService implements EntityTableDataSource {
  private readonly PATH = '/api/checks/runs';

  private ref?: DynamicDialogRef;

  constructor(
    private readonly http: HttpClient,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {}

  addRun(): void {
    this.dialogService.open(CheckRunFormComponent, {
      header: 'Neue Prüfung anlegen',
      dismissableMask: true,
      closeOnEscape: true,
    });
  }

  editCheckRun(run: CheckRun) {
    this.ref = this.dialogService.open(CheckRunFormComponent, {
      header: 'Prüfung Information',
      closeOnEscape: true,
      dismissableMask: true,
      data: {
        run: run,
      },
    });
  }

  async createCheckRun(run: CheckRun): Promise<CheckRun> {
    return this.http
      .post<CheckRun>(this.PATH, run)
      .pipe<CheckRun>(
        tap((run: CheckRun) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `Prüfung wurde angelegt`,
            life: 3000,
          });
          this.ref?.close();
        })
      )
      .toPromise();
  }

  async updateCheckRun(run: CheckRun, runId: UUID4) {
    this.http
      .put<CheckRun>(`${this.PATH}/${runId}`, run)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `Prüfung wurde aktualisiert`,
            life: 3000,
          });
          this.ref?.close();
        })
      )
      .subscribe();
  }

  deleteEntity(id: string): void {
    throw new Error('Method not implemented.');
  }
  editEntity(id: string): void {
    throw new Error('Method not implemented.');
  }
  showEntity(id: string): void {
    window.open(`http://system4.blue:3333/api/checks/runs/${id}/pdf`, '_blank');
  }
  addEntity(): void {
    this.addRun();
  }

  async loadEntites(
    searchString?: string,
    page?: number,
    limit?: number,
    sortByField?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filters?: FilterParam<any>[]
  ): Promise<PaginationResult<CheckRun>> {
    let params = composeHttpPagingParams(
      searchString,
      page,
      limit,
      sortByField,
      sortOrder,
      filters
    );

    params = params.set('relations', 'template,checker');

    return this.http
      .get<PaginationResult<any>>(this.PATH, {
        params,
      })
      .pipe(
        map((value) => {
          value.data = value.data.map((check) => {
            if (check.checker)
              check.checker = `${check.checker.lastName} (${check.checker.memberId})`;

            if (check.template) check.template = check.template.name;

            return check;
          });

          return value;
        })
      )
      .toPromise();
  }
}

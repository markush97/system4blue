import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckRun } from '@system4blue/api-interfaces';
import {  MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs/operators';
import { UUID4 } from '@system4blue/types';
import { CheckRunFormComponent } from './check-run-form/check-run-form.component';

@Injectable({
  providedIn: 'root',
})
export class AdminChecksRunService {
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

  async createCheckRun(
    run: CheckRun
  ): Promise<CheckRun> {
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
}

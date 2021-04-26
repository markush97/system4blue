import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckTemplate, PaginationResult } from '@system4blue/api-interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminChecksTemplateFormComponent } from './admin-checks-template-form/admin-checks-template-form.component';
import { tap } from 'rxjs/operators';
import { UUID4 } from '@system4blue/types';

@Injectable({
  providedIn: 'root',
})
export class AdminChecksTemplateService {
  private readonly PATH = '/api/checks/template';

  private ref?: DynamicDialogRef;

  constructor(
    private readonly http: HttpClient,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {}

  async getTemplatesList(): Promise<CheckTemplate[]> {
    return (await this.getTemplates()).data;
  }

  async getTemplates(): Promise<PaginationResult<CheckTemplate>> {
    return this.http.get<PaginationResult<CheckTemplate>>(this.PATH).toPromise();
  }

  async getTemplate(templateId: UUID4): Promise<CheckTemplate> {
    return this.http.get<CheckTemplate>(`${this.PATH}/${templateId}`).toPromise();
  }

  addTemplate(): void {
    this.dialogService.open(AdminChecksTemplateFormComponent, {
      header: 'Neue Prüfungsvorlage anlegen',
      dismissableMask: true,
      closeOnEscape: true,
    });
  }

  editTemplate(template: CheckTemplate) {
    this.ref = this.dialogService.open(AdminChecksTemplateFormComponent, {
      header: 'Prüfungsvorlage Information',
      closeOnEscape: true,
      dismissableMask: true,
      data: {
        template: template,
      },
    });
  }

  showTemplate(template: CheckTemplate) {
    this.editTemplate(template);
  }

  async deleteTemplate(template: CheckTemplate) {
    this.confirmationService.confirm({
      message: template.name + ' wirklich löschen?',
      header: 'Bestätigen',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`${this.PATH}/${template.id}`).subscribe(() =>
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg',
            detail: template.name + ' gelöscht',
            life: 3000,
          })
        );
      },
    });
  }

  async createTemplate(
    template: CheckTemplate
  ): Promise<CheckTemplate> {
    return this.http
      .post<CheckTemplate>(this.PATH, template)
      .pipe<CheckTemplate>(
        tap((template: CheckTemplate) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `${template.name} wurde angelegt`,
            life: 3000,
          });
          this.ref?.close();
        })
      )
      .toPromise();
  }

  async updateTemplate(template: CheckTemplate, templateId: UUID4) {
    this.http
      .put<CheckTemplate>(`${this.PATH}/${templateId}`, template)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `${template.name} wurde aktualisiert`,
            life: 3000,
          });
          this.ref?.close();
        })
      )
      .subscribe();
  }
}

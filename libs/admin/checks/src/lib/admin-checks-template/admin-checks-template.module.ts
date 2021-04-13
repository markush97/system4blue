import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminChecksTemplateComponent } from './admin-checks-template/admin-checks-template.component';
import { AdminChecksTemplateDetailComponent } from './admin-checks-template-detail/admin-checks-template-detail.component';
import { AdminChecksTemplateFormComponent } from './admin-checks-template-form/admin-checks-template-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminChecksTemplateService } from './admin-checks-template.service';
import { ChipsModule } from 'primeng/chips';


@NgModule({
  declarations: [AdminChecksTemplateComponent, AdminChecksTemplateDetailComponent, AdminChecksTemplateFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ChipsModule
  ],
  providers: [DialogService, AdminChecksTemplateService],
  exports: [AdminChecksTemplateComponent]
})
export class AdminChecksTemplateModule { }

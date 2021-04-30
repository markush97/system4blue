import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ChipsModule } from 'primeng/chips';
import { CheckRunFormComponent } from './check-run-form/check-run-form.component';
import { AdminChecksRunService } from './admin-checks-run.service';
import { AdminCheckRunComponent } from './admin-check-run/admin-check-run.component';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {CheckboxModule} from 'primeng/checkbox';
import {InputMaskModule} from 'primeng/inputmask';


@NgModule({
  declarations: [CheckRunFormComponent, AdminCheckRunComponent],
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
    ChipsModule,
    TriStateCheckboxModule,
    CheckboxModule,
    InputMaskModule
  ],
  providers: [AdminChecksRunService, DialogService],
  exports: [AdminCheckRunComponent]
})
export class AdminCheckRunModule { }

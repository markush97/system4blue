import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminStorageComponent } from './admin-storage/admin-storage.component';
import { AdminStorageService } from './admin-storage.service';
import { AdminStorageSelectorComponent } from './admin-storage-selector/admin-storage-selector.component';
import { TreeModule } from 'primeng/tree';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AdminStorageDetailComponent } from './admin-storage-detail/admin-storage-detail.component';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import { AdminItemsService } from '@system4blue/admin/items';
import {TableModule} from 'primeng/table';
import { AdminStorageFormComponent } from './admin-storage-form/admin-storage-form.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    CardModule,
    FieldsetModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminStorageComponent },
    ]),
    TreeModule,
    DynamicDialogModule,
  ],
  declarations: [AdminStorageComponent, AdminStorageSelectorComponent, AdminStorageDetailComponent, AdminStorageFormComponent],
  providers: [AdminStorageService, AdminItemsService, DialogService],
})
export class AdminStorageModule {}

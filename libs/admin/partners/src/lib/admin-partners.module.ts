import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminPartnersListComponent } from './admin-partners-list/admin-partners-list.component';
import { AdminPartnersService } from './admin-partners.service';
import { EntityTableModule } from '@system4blue/components';
import { HttpClientModule } from '@angular/common/http';
import { AdminPartnersDetailComponent } from './admin-partners-detail/admin-partners-detail.component';
import { AdminPartnersComponent } from './admin-partners/admin-partners.component';
import { AdminPartnersFormComponent } from './admin-partners-form/admin-partners-form.component';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ReactiveFormsModule,
    ButtonModule,
    DynamicDialogModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: AdminPartnersComponent}
    ]),
    EntityTableModule
  ],
  declarations: [AdminPartnersListComponent, AdminPartnersDetailComponent, AdminPartnersComponent, AdminPartnersFormComponent],
  providers: [AdminPartnersService, DialogService]
})
export class AdminPartnersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminMembersListComponent } from './admin-members-list/admin-members-list.component';
import { EntityTableModule } from '@system4blue/components';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AdminMembersComponent } from './admin-members/admin-members.component';
import { AdminMembersService } from './admin-members.service';
import { AdminMembersFormComponent } from './admin-members-form/admin-members-form.component';

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
    EntityTableModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminMembersComponent },
    ]),
  ],
  declarations: [AdminMembersListComponent, AdminMembersComponent, AdminMembersFormComponent],
  providers: [DialogService, AdminMembersService],
})
export class AdminMembersModule {}

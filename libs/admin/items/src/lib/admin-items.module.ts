import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { AdminItemsComponent } from './admin-items/admin-items.component';
import { AdminItemsService } from './admin-items.service';
import { ItemGroupFormComponent } from './item-group-form/item-group-form.component';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import { AdminPartnersModule } from '@system4blue/admin/partners';
import { AdminPartnersService } from '@system4blue/admin/partners';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AdminChecksTemplateService } from '@system4blue/admin/checks';
import { ItemsListComponent } from './items-list/items-list.component';
import {BadgeModule} from 'primeng/badge';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminItemsComponent },
    ]),
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    InputTextareaModule,
    DropdownModule,
    AutoCompleteModule
  ],
  declarations: [
    AdminItemsComponent,
    ItemGroupFormComponent,
    ItemsListComponent
  ],
  providers: [
    AdminItemsService,
    DialogService,
    AdminPartnersService,
    AdminChecksTemplateService
  ],
  exports: [
  ]
})
export class AdminItemsModule {}

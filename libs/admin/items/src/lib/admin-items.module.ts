import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { AdminItemsComponent } from './admin-items/admin-items.component';
import { AdminItemsService } from './admin-items.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AdminItemsComponent },
    ]),
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
  ],
  declarations: [
    AdminItemsComponent
  ],
  providers: [
    AdminItemsService
  ],
  exports: [
  ]
})
export class AdminItemsModule {}

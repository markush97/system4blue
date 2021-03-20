import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsDetailComponent } from './items-detail/items-detail.component';
import { ItemsCreateComponent } from './items-create/items-create.component';
import { ItemgroupCreateComponent } from './itemgroup-create/itemgroup-create.component';
import { ItemgroupListComponent } from './itemgroup-list/itemgroup-list.component';
import { ItemgroupDetailComponent } from './itemgroup-detail/itemgroup-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ItemslistService } from './itemslist.service';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'groups', component: ItemgroupListComponent },
      { path: 'groups/:id', component: ItemgroupDetailComponent },
      { path: '', pathMatch: 'full', component: ItemsListComponent },
    ]),
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
  ],
  declarations: [
    ItemsListComponent,
    ItemsDetailComponent,
    ItemsCreateComponent,
    ItemgroupCreateComponent,
    ItemgroupListComponent,
    ItemgroupDetailComponent,
  ],
  providers: [
    ItemslistService
  ],
})
export class AdminItemsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsDetailComponent } from './items-detail/items-detail.component';
import { ItemsCreateComponent } from './items-create/items-create.component';
import { ItemgroupCreateComponent } from './itemgroup-create/itemgroup-create.component';
import { ItemgroupListComponent } from './itemgroup-list/itemgroup-list.component';
import { ItemgroupDetailComponent } from './itemgroup-detail/itemgroup-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ItemsListComponent}
    ]),
  ],
  declarations: [ItemsListComponent, ItemsDetailComponent, ItemsCreateComponent, ItemgroupCreateComponent, ItemgroupListComponent, ItemgroupDetailComponent],
})
export class AdminItemsModule {}

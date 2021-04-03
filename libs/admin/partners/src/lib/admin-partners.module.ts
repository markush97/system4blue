import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminPartnersListComponent } from './admin-partners-list/admin-partners-list.component';
import { AdminPartnersService } from './admin-partners.service';
import { EntityTableModule } from '@system4blue/components';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: AdminPartnersListComponent}
    ]),
    EntityTableModule
  ],
  declarations: [AdminPartnersListComponent],
  providers: [AdminPartnersService]
})
export class AdminPartnersModule {}

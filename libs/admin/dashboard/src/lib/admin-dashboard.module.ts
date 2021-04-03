import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const adminDashboardRoutes: Route[] = [
  {component: AdminDashboardComponent, path: 'dashboard'},
  {component: AdminDashboardComponent, path: '*', pathMatch: 'full'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminDashboardRoutes)],
  declarations: [AdminDashboardComponent],
  exports: []
})
export class AdminDashboardModule {}

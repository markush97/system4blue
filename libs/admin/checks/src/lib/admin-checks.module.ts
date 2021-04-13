import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminChecksTemplateComponent } from './admin-checks-template/admin-checks-template/admin-checks-template.component';
import { AdminChecksTemplateModule } from './admin-checks-template/admin-checks-template.module';

@NgModule({
  imports: [
    CommonModule,
    AdminChecksTemplateModule,
    RouterModule.forChild([
      {path: 'templates', pathMatch: 'full', component: AdminChecksTemplateComponent}
    ]),
  ]
})
export class AdminChecksModule {}

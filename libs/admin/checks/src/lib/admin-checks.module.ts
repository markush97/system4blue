import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminChecksTemplateComponent } from './admin-checks-template/admin-checks-template/admin-checks-template.component';
import { AdminChecksTemplateModule } from './admin-checks-template/admin-checks-template.module';
import { AdminCheckRunModule } from './admin-check-run/admin-check-run.module';
import { CheckRunFormComponent } from './admin-check-run/check-run-form/check-run-form.component';
import { AdminCheckRunComponent } from './admin-check-run/admin-check-run/admin-check-run.component';

@NgModule({
  imports: [
    CommonModule,
    AdminChecksTemplateModule,
    AdminCheckRunModule,
    RouterModule.forChild([
      {path: 'templates', pathMatch: 'full', component: AdminChecksTemplateComponent},
      {path: 'runs', pathMatch: 'full', component: AdminCheckRunComponent}
    ]),
  ],
  declarations: []
})
export class AdminChecksModule {}

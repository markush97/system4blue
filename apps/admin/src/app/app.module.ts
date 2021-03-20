import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {
  AdminDashboardModule,
  adminDashboardRoutes,
} from '@system4blue/admin/dashboard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: 'dashboard', children: adminDashboardRoutes },
        {
          path: 'items',
          loadChildren: () =>
            import('@system4blue/admin/items').then(
              (module) => module.AdminItemsModule
            ),
        },
        {
          path: 'checks',
          loadChildren: () =>
            import('@system4blue/admin/checks').then(
              (module) => module.AdminChecksModule
            ),
        },
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
      ],
      { initialNavigation: 'enabled' }
    ),
    AdminDashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

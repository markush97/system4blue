import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {
  AdminDashboardModule,
  adminDashboardRoutes,
} from '@system4blue/admin/dashboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {
          path: 'members',
          loadChildren: () =>
            import('@system4blue/admin/members').then(
              (module) => module.AdminMembersModule
            ),
        },
        {
          path: 'partners',
          loadChildren: () =>
            import('@system4blue/admin/partners').then(
              (module) => module.AdminPartnersModule
            ),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    AdminDashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

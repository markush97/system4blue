import { Component } from '@angular/core';
import { EntityTableDefinition } from '@system4blue/components';
import { AdminPartnersService } from '../admin-partners.service';

@Component({
  selector: 'system4blue-admin-partners-list',
  template: `
    <s4b-entity-table
      [dataSource]="partnersService"
      [tableDefinition]="tableDefinition"
    ></s4b-entity-table>
  `,
  styleUrls: ['./admin-partners-list.component.scss'],
})
export class AdminPartnersListComponent {
  readonly tableDefinition: EntityTableDefinition = {
    title: 'Partner verwalten',
    entityName: 'Partner',
    columns: [
      { field: 'name', label: 'Name', sortAble: true, type: 'text' },
      { field: 'webpage', label: 'Homepage', sortAble: true, type: 'link' },
      { field: 'contactEmail', label: 'Email', sortAble: false, type: 'email' },
      {
        field: 'contactPhone',
        label: 'Telefon',
        sortAble: false,
        type: 'phone',
      },
    ],
  };

  constructor(readonly partnersService: AdminPartnersService) {}
}

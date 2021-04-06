import { Component } from '@angular/core';
import { EntityTableDefinition } from '@system4blue/components';
import { AdminMembersService } from '../admin-members.service';

@Component({
  selector: 'system4blue-admin-members-list',
  template: `
  <s4b-entity-table [dataSource]="membersService" [tableDefinition]="tableDefinition"></s4b-entity-table>
  `,
  styleUrls: ['./admin-members-list.component.scss']
})
export class AdminMembersListComponent {

  readonly tableDefinition: EntityTableDefinition = {
    title: 'Mitglieder verwalten',
    entityName: 'Mitglied',
    columns: [
      {field: 'firstName', label: 'Vorname', sortAble: true, type: 'text'},
      {field: 'lastName', label: 'Nachname', sortAble: true, type: 'text'},
      {field: 'memberId', label: 'Mitgliedernummer', sortAble: true, type: 'numeric'},
      {field: 'email', label:'Email', sortAble: false, type: 'email'},
      {field: 'phone', label:'Telefon', sortAble: false, type: 'phone'}
    ]
  };

  constructor(readonly membersService: AdminMembersService) { }

}

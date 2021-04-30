import { Component } from '@angular/core';
import { CheckRun } from '@system4blue/api-interfaces';
import { EntityTableDefinition } from '@system4blue/components';
import { AdminChecksRunService } from '../admin-checks-run.service';

@Component({
  selector: 'system4blue-admin-check-run',
  templateUrl: './admin-check-run.component.html',
  styleUrls: ['./admin-check-run.component.scss']
})
export class AdminCheckRunComponent {

  constructor(readonly service: AdminChecksRunService) {}

  readonly definition: EntityTableDefinition = {
    entityName: 'Prüfungsdurchgänge',
    title: 'Prüfungsdurchgänge: Übersicht',
    columns: [
      {field: 'date', label: 'Prüfdatum', type: 'date', sortAble: true},
      {field: 'template', label: 'Prüfung', type: 'text', sortAble: true},
      {field: 'checker', label: 'Prüfer', type: 'text', sortAble: true}
    ]
  }

  test() {
    this.service.addRun();
  }
}

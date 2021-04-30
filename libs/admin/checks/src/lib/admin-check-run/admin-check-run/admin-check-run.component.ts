import { Component } from '@angular/core';
import { AdminChecksRunService } from '../admin-checks-run.service';

@Component({
  selector: 'system4blue-admin-check-run',
  templateUrl: './admin-check-run.component.html',
  styleUrls: ['./admin-check-run.component.scss']
})
export class AdminCheckRunComponent {

  constructor(private readonly service: AdminChecksRunService) {}

  test() {
    this.service.addRun();
  }
}

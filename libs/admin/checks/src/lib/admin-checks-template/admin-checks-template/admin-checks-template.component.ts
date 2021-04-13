import { Component } from '@angular/core';
import { AdminChecksTemplateService } from '../admin-checks-template.service';

@Component({
  selector: 'system4blue-admin-checks-template',
  templateUrl: './admin-checks-template.component.html',
  styleUrls: ['./admin-checks-template.component.scss']
})
export class AdminChecksTemplateComponent {

  constructor(private readonly service: AdminChecksTemplateService) {}

  test() {
    this.service.addTemplate();
  }
}

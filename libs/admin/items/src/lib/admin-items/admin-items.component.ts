import { Component, OnInit } from '@angular/core';
import { AdminItemsService } from '../admin-items.service';

@Component({
  selector: 'system4blue-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.scss']
})
export class AdminItemsComponent {

  constructor(private readonly itemService: AdminItemsService) { }

  test() {
    this.itemService.addItemGroup();
  }

}

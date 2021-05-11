import { Component, Input, ViewChild } from '@angular/core';
import { Item, StorageContainer } from '@system4blue/api-interfaces';
import { AdminItemsService } from '@system4blue/admin/items';
import { AdminStorageService } from '../admin-storage.service';

@Component({
  selector: 'system4blue-admin-storage-detail',
  templateUrl: './admin-storage-detail.component.html',
  styleUrls: ['./admin-storage-detail.component.scss'],
})
export class AdminStorageDetailComponent {
  @Input() container!: StorageContainer;
  items: Item[] = [];

  itemListCollapsed = true;

  constructor(
    // private readonly itemService: AdminItemsService,
    readonly storageService: AdminStorageService
  ) {}

  types = {
    0: 'Fahrzeug',
    1: 'Fest verbaut (z.B Regale)',
    2: 'Kiste',
    3: 'Person',
    5: 'Gebäude / Raum',
    4: 'Sonstiges',
  };

  reloadItems(collapsed: boolean) {
    if (collapsed) {
      //this.itemService
      //  .loadItemsInStorage(this.container.id)
      //  .then((results) => (this.items = results.data));
    }
  }

  collapseItemList() {
    this.itemListCollapsed = true;
  }

  deleteContainer() {
    this.storageService.deleteContainer(this.container);
  }

  addSubContainer() {
    this.storageService.addContainer(this.container.id ?? '');
  }

  updateContainer() {
    this.storageService.editContainer(this.container);
  }
}

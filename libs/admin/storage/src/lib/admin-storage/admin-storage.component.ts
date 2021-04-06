import { Component } from '@angular/core';
import { StorageContainer } from '@system4blue/api-interfaces';
import { AdminStorageService } from '../admin-storage.service';

@Component({
  selector: 'system4blue-admin-storage',
  templateUrl: './admin-storage.component.html',
  styleUrls: ['./admin-storage.component.scss']
})
export class AdminStorageComponent {

  constructor(private readonly storageService: AdminStorageService) {}

  selectedContainer!: StorageContainer;

  selectContainer(container: StorageContainer) {
    this.selectedContainer = container;
  }

  addRootContainer() {
    this.storageService.addRootContainer();
  }
}

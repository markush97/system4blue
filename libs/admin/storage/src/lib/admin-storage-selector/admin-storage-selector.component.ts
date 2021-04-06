import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageContainer } from '@system4blue/api-interfaces';
import { TreeNode } from 'primeng/api';
import { AdminStorageService } from '../admin-storage.service';

@Component({
  selector: 'system4blue-admin-storage-selector',
  templateUrl: './admin-storage-selector.component.html',
  styleUrls: ['./admin-storage-selector.component.scss'],
})
export class AdminStorageSelectorComponent implements OnInit {
  containerTree!: TreeNode<StorageContainer>[];
  selectedNode!: TreeNode<StorageContainer>;

  loading = true;

  @Output() containerSelectEvent = new EventEmitter<StorageContainer>();

  constructor(private readonly storageService: AdminStorageService) {}

  ngOnInit() {
    this.refresh();
  }

  selectNode(selectedNode:TreeNode<StorageContainer>) {
    this.containerSelectEvent.emit(selectedNode.data);
  }

  refresh(): void {
    this.loading = true;
    this.storageService
      .getContainersTree()
      .then((containerTree) => {
        (this.containerTree = containerTree)
        this.loading = false;
      });
  }
}

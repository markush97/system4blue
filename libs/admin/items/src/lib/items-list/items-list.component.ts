import { Component, OnInit } from '@angular/core';
import { ItemGroup } from '@system4blue/api-interfaces';
import { LazyLoadEvent } from 'primeng/api';
import { AdminItemsService } from '../admin-items.service';

@Component({
  selector: 'system4blue-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  itemGroups!: ItemGroup[];

  totalRecords!: number;

  loading = true;

  constructor(private readonly itemGroupService: AdminItemsService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(event?: LazyLoadEvent) {
    this.loading = true;
    this.itemGroupService.loadItemGroupWithItems().then((res) => {
      this.itemGroups = res.data;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }
}

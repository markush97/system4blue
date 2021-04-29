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

  states = [
    {label: 'Aktiv', code: 0},
    {label:'Beschädigt', code: 1},
    {label:'Verborgt', code: 2},
    {label:'Ausgeschieden', code: 3},
    {label:'Reserve', code: 4},
    {label:'Unbekannt', code: 5}
  ]

  constructor(private readonly itemService: AdminItemsService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(event?: LazyLoadEvent) {
    this.loading = true;
    this.itemService.loadItemGroupWithItems().then((res) => {
      this.itemGroups = res.data;
      this.totalRecords = res.total;
      this.loading = false;
    });
  }

  addItem(itemGroup: ItemGroup) {
    this.itemService.addItem(itemGroup);
  }

  updateItemGroup(itemGroup: ItemGroup) {
    this.itemService.editItemGroup(itemGroup);
  }
}

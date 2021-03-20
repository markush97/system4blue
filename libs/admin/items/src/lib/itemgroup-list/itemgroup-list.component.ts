import { Component, OnInit } from '@angular/core';
import { ItemGroup } from '@system4blue/api-interfaces';
import { Observable, of } from 'rxjs';
import { ItemslistService } from './../itemslist.service';

@Component({
  selector: 'system4blue-itemgroup-list',
  templateUrl: './itemgroup-list.component.html',
  styleUrls: ['./itemgroup-list.component.scss']
})
export class ItemgroupListComponent implements OnInit {
  $itemGroups: Observable<ItemGroup[]>;

  columns: { field: keyof ItemGroup; header: string, nested?: string }[] = [
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Beschreibung' },
  ];

  constructor(private readonly itemlistService: ItemslistService) {
    this.$itemGroups = of([]);
  }

  ngOnInit(): void {
    this.$itemGroups = this.itemlistService.getItemGroups();
    this.$itemGroups.subscribe(console.log)
  }

}

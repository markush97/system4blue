import { Component, OnInit } from '@angular/core';
import { Item } from '@system4blue/api-interfaces';
import { Observable, of } from 'rxjs';
import { ItemslistService } from '../itemslist.service';

@Component({
  selector: 'system4blue-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  $items: Observable<Item[]>;

  columns: { field: keyof Item; header: string, nested?: string }[] = [
    { field: 'externalId', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Beschreibung' },
  ];

  constructor(private readonly itemlistService: ItemslistService) {
    this.$items = of([]);
  }

  ngOnInit(): void {
    this.$items = this.itemlistService.getItems();
    this.$items.subscribe(console.log)
  }
}

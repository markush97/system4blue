import { Component, OnInit } from '@angular/core';
import { ItemGroup } from '@system4blue/api-interfaces';
import { Observable, of } from 'rxjs';
import { ItemslistService } from './../itemslist.service';
import {DialogService} from 'primeng/dynamicdialog';
import { ItemgroupCreateComponent } from '../itemgroup-create/itemgroup-create.component';

@Component({
  selector: 'system4blue-itemgroup-list',
  templateUrl: './itemgroup-list.component.html',
  styleUrls: ['./itemgroup-list.component.scss'],
  providers: [DialogService]
})
export class ItemgroupListComponent implements OnInit {
  $itemGroups: Observable<ItemGroup[]>;

  columns: { field: keyof ItemGroup; header: string, nested?: string }[] = [
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Beschreibung' },
  ];

  constructor(private readonly itemlistService: ItemslistService, private readonly dialogService: DialogService) {
    this.$itemGroups = of([]);
  }

  ngOnInit(): void {
    this.$itemGroups = this.itemlistService.getItemGroups();
    this.$itemGroups.subscribe(console.log)
  }

  showCreate(): void {
    const ref = this.dialogService.open(ItemgroupCreateComponent, {header: 'Neue Gegenstandskategorie anlegen', width: '70%'});
  }

}

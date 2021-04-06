import { Component, Input, OnInit } from '@angular/core';
import {
  FilterCondition,
  FilterParam,
  PaginationResult,
} from '@system4blue/api-interfaces';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { EntityTableColumn } from '../entity-table-column.type';
import { EntityTableDataSource } from '../entity-table-datasource.interface';
import { EntityTableDefinition } from '../entity-table-definition.type';

const operatorMapper: Record<string, FilterCondition> = {
  startsWith: 'starts',
  contains: 'cont',
  notContains: 'ncont',
  endsWith: 'ends',
  equals: 'eq',
  notEquals: 'ne',
  dateBefore: 'lt',
  dateAfter: 'gt',
  dateIs: 'eq',
  dateIsNot: 'ne',
  lt: 'lt',
  lte: 'lte',
  gt: 'gt',
  gte: 'gte',
};

@Component({
  selector: 's4b-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
})
export class EntityTableComponent implements OnInit {
  @Input() dataSource!: EntityTableDataSource;
  @Input() tableDefinition!: EntityTableDefinition;

  entities: any[] = [];
  totalRecords = 0;
  loading = true;

  searchString!: string;
  lastSearch!: LazyLoadEvent;

  constructor(
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadEntities();
  }

  refresh() {
    this.loadEntities();
  }

  loadEntities(event?: LazyLoadEvent) {
    this.loading = true;

    if (event !== undefined) {
      this.lastSearch = event;

      const sortOrder = (event.sortOrder ?? 0) < 0 ? 'DESC' : 'ASC';

      event.first = event.first ?? 0;
      event.rows = event.rows ?? 10;

      const filters: FilterParam<any>[] = [];

      if (event.filters !== undefined) {

        Object.entries(event.filters).forEach(([key, filter]) => {
          if (filter.matchMode !== undefined && filter.value)
            filters.push(
              `${key}||${operatorMapper[filter.matchMode]}||${
                filter.value
              }` as FilterParam<any>
            );
        });
      }

      this.dataSource
        .loadEntites(
          this.searchString,
          event.first / event.rows,
          event.rows,
          event.sortField,
          sortOrder,
          filters
        )
        .then(this.displayEntites);
    } else {
      this.dataSource.loadEntites().then(this.displayEntites);
    }
  }

  filterGlobal(searchString: string) {
    this.searchString = searchString;
    this.loadEntities(this.lastSearch);
  }

  deleteEntity(entityId: string) {
    this.confirmationService.confirm({
      message: this.tableDefinition.entityName + ' wirklich löschen?',
      header: 'Bestätigen',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataSource.deleteEntity(entityId);
        this.messageService.add({
          severity: 'success',
          summary: 'Erfolg',
          detail: this.tableDefinition.entityName + ' gelöscht',
          life: 3000,
        });
        this.loadEntities(this.lastSearch);
      },
    });
  }

  editEntity(entityId: string) {
    this.dataSource.editEntity(entityId);
  }

  private displayEntites = (result: PaginationResult<any>) => {
    this.totalRecords = result.total;
    this.entities = result.data;
    this.loading = false;
  };

  showEntity(entityId: string) {
    this.dataSource.showEntity(entityId);
  }

  addEntity() {
    this.dataSource.addEntity();
  }

  get columns(): EntityTableColumn<any>[] {
    return this.tableDefinition.columns;
  }
}

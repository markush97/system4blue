/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityTableColumn } from './entity-table-column.type';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface EntityTableDefinition<E extends object = any>  {
  columns: EntityTableColumn<E>[];
  title: string;
  entityName: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type EntityTableColumn<E extends object> = {
  field: (string & keyof E);
  label: string;
  sortAble: boolean;
  type: 'text' | 'email' | 'phone' | 'numeric' | 'link' | 'date' | 'boolean';
};

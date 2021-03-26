export interface QueryResult<T> {
  data: T[];
  total: number;
  count: number;
  pageTotal: number;
  pageCount: number;

}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  count: number;
  pageTotal: number;
  pageCount: number;

}

export interface IQueryParams {
  _page?: number;
  _limit?: number;
  _search?: string;
  _keyword?: string;
  _sort?: string;
  _order?: "asc" | "desc";
}

export interface IProductQueryParams extends IQueryParams {
  _minPrice?: number;
  _maxPrice?: number;
}

export interface IResponse<T> {
  message: string;
  data: T;
}

export interface IResponseList<T> {
  message: string;
  data: {
    docs: T[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
  };
}

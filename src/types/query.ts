export interface IQuery {
  page: string;
  limit: string;
  fields: string;
  sort: string;
}

export interface IGetAllProductsQuery extends IQuery {
  title: string;
  price: string;
  category: string;
  size: string;
  color: string;
}

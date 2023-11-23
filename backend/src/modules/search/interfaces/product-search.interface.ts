export interface ProductSearchBody {
  id: number;
  title: string;
  body_html: string;
}

export interface ProductSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: ProductSearchBody;
    }>;
  };
}

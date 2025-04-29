export interface GiphyImage {
  url: string;
  width: string;
  height: string;
}

export interface GiphyGif {
  id: string;
  title: string;
  images: {
    original: GiphyImage;
    fixed_height: GiphyImage;
    fixed_width: GiphyImage;
  };
}

export interface GiphyResponse {
  data: GiphyGif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}


export interface SearchParams {
  q: string;
  page: string;
  limit: string;
}

export type SearchParamsKeys = keyof SearchParams;

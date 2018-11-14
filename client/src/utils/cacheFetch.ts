import { API_URL } from "../constants";

interface Cache {
  [url: string]: {
    fetchedAt: number;
    data: any;
  };
}

let cache: Cache = {};

const cacheFetch = async (url: string, cacheData: boolean = true) => {
  const cachedResponse = cache[url];
  // only return cached results if fetched in the last 5 mins
  if (
    cachedResponse &&
    new Date().getDate() - cachedResponse.fetchedAt < 5 * 60 * 1000
  ) {
    console.log("IN CACHE for url!!!", url);
    return cachedResponse.data;
  }
  const response = await fetch(`${API_URL}${url}`, {
    mode: "cors"
  });
  const data = await response.json();
  console.log(`data`, data);
  if (cacheData) {
    cache[url] = {
      data,
      fetchedAt: new Date().getDate()
    };
  }
  return data;
};

const api = {
  searchFEC: (name: string) => cacheFetch(`/search-fec?q=${name}`),
  searchAds: (query: string) => cacheFetch(`/search-ads?q=${query}`),
  adsForPage: ({ query, id }: { query: string; id: string }) =>
    cacheFetch(`/ads-for-page?q=${query}&pageId=${id}`)
};

export default api;

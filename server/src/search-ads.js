import { corsSuccessResponse, runWarm } from './utils';
import filterMatchingPages from './utils/filter-matching-pages';
import fetchAds from './utils/fetch-ads';

const searchAds = async (event, context, callback) => {
  const {
    queryStringParameters: { q, filtered },
  } = event;
  const removedPages = filtered ? filtered.split(',') : [];
  const json = await fetchAds(q);

  const matchingPages = filterMatchingPages(json, q).filter(
    ({ pageID }) => !removedPages.includes(pageID)
  );

  const results = await fetchAds(q, matchingPages.map(({ pageID }) => pageID));

  const response = corsSuccessResponse({
    ads: results.payload.results,
    fullPayload: results.payload.results.length === results.payload.totalCount,
    totalCount: results.payload.totalCount,
    matchingPages,
  });

  callback(null, response);
};

export default runWarm(searchAds);

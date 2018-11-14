import { corsSuccessResponse, runWarm } from './utils';
import filterMatchingPages from './utils/filter-matching-pages';
import fetchAds from './utils/fetch-ads';

const adsForPage = async (event, context, callback) => {
  const {
    queryStringParameters: { q, pageId },
  } = event;
  const results = await fetchAds(q, [pageId]);

  console.log(`results`, results);
  const response = corsSuccessResponse({
    ads: results.payload.results,
    fullPayload: results.payload.results.length === results.payload.totalCount,
    totalCount: results.payload.totalCount,
  });

  callback(null, response);
};

export default runWarm(adsForPage);


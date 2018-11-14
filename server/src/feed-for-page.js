import RSS from 'rss';

import { xmlSuccessResponse, runWarm } from './utils';
import fetchAds from './utils/fetch-ads';

const feedForPage = async (event, context, callback) => {
  const {
    queryStringParameters: { pageId, pageName },
  } = event;
  const results = await fetchAds(pageName, [pageId]);

  const ads = results.payload.results;

  const feedOptions = {
    title: pageName,
    description: `A feed of ads from the ${pageName} Facebook page`,
    feed_url: `https://paid-for-by.netlify.com/feed-for-page?pageId=${pageId}&pageName=${pageName}`,
    site_url: `https://paid-for-by.netlify.com`,
  };

  const feed = new RSS(feedOptions);

  ads.forEach(
    ({
      startDate,
      adid,
      snapshot: {
        title,
        body: {
          markup: { __html: description },
        },
      },
    }) =>
      feed.item({
        url: `https://www.facebook.com/ads/archive/?active_status=all&ad_type=political_and_issue_ads&country=US&page_ids[0]=${pageId}&q=${encodeURIComponent(
          pageName
        )}`,
        guid: adid,
        title,
        date: new Date(startDate * 1000),
        description,
      })
  );

  const xml = feed.xml();

  const response = xmlSuccessResponse(xml);

  callback(null, response);
};

export default runWarm(feedForPage);

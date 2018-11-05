import fetch from 'node-fetch';

const fetchAds = async (q, pageIds = []) => {
  const pageQuery = pageIds.map((id, i) => `&page_ids[${i}]=${id}`).join('');
  const url = `https://www.facebook.com/ads/archive/async/search_ads/?q=${encodeURIComponent(
    q
  )}&count=30&active_status=all&type=all&country=US&dpr=1${pageQuery}`;
  console.log(`url`, url);
  const resp = await fetch(url, {
    credentials: 'include',
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      'content-type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: 'origin-when-cross-origin',
    body:
      '__user=0&__a=1&__dyn=7AzHJ4zamaUmgDxKSudg9odpbGEW8UhheC11xG3F6wAxu13wFG2K48jyR88xK5WAAzoOuVWxeUW2y4GDgdoWdxK4ohyVeE8UnyogKcx2785aayrwQx66E4G27xm9geEtK5u1fwLho5u16Dx6WxSq2qFoy6oswgEdoK14CzoK13x3xzzUny9EbE9E-dgqAz8bA4olwPzpo-cG4HxCfxKaxGcwmqGu2K7Unz8OuV8y2G2C9hEKUcUOfKUbE9Urxy5E9kbw&__req=g&__be=-1&__pc=PHASED%3ADEFAULT&__rev=4499086&lsd=AVpWBHRo',
    method: 'POST',
    mode: 'cors',
  });
  const text = await resp.text();
  const json = JSON.parse(text.replace('for (;;);', ''));
  return json;
};

export default fetchAds;

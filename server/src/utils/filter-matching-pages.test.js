import fs from 'fs';

import filterMatchingPages from './filter-matching-pages';

describe('filterMatchingPages', () => {
  it('tests filterMatchingPages()', () => {
    const data = JSON.parse(fs.readFileSync('./fixtures/response.json'));
    const result = filterMatchingPages(data, 'hillary clinton');
    expect(result.length).toEqual(2);
  });
});

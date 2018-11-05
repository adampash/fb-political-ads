const filterMatchingPages = (json, query) => {
  const {
    payload: { pageResults },
  } = json;
  const queryText = query.toLowerCase().split(/\s+/);
  return pageResults.filter(({ pageName }) =>
    queryText.reduce(
      (acc, str) => acc && pageName.toLowerCase().includes(str),
      true
    )
  );
};

export default filterMatchingPages;

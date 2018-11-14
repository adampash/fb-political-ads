import * as React from "react";

import { API_URL, ADS_URL } from "../constants";
import { Page, FECMatch } from "../../types";
import { Details, PageLink, Loading } from "./styles";
import cacheFetch from "../utils/cacheFetch";
import api from "../utils/cacheFetch";

interface Props {
  page: Page;
  query: string;
  activatePage: (e: React.SyntheticEvent<any>) => void;
  activePage: Page | { pageID: string };
  setFECOverLimit: (fecOverLimit: boolean) => void;
}

interface State {
  candidateMatches: FECMatch;
  committeeMatches: FECMatch;
  fecSearchComplete: boolean;
  noMatch: boolean;
}

class PaidForBy extends React.Component<Props, State> {
  state: State = {
    candidateMatches: {
      results: [],
    },
    committeeMatches: {
      results: [],
    },
    fecSearchComplete: false,
    noMatch: false,
  };

  async componentDidMount() {
    const {
      page: { pageName },
    } = this.props;
    // const response = await fetch(`${API_URL}/search-fec?q=${pageName}`, {
    //   mode: "cors"
    // });
    // const fecData = await response.json();
    try {
      const fecData = await api.searchFEC(pageName);
      const { candidateMatches, committeeMatches } = fecData;
      const noMatch =
        candidateMatches.results.length === 0 &&
        committeeMatches.results.length === 0;
      this.props.setFECOverLimit(false);
      this.setState({ ...fecData, fecSearchComplete: true, noMatch });
    } catch {
      this.props.setFECOverLimit(true);
      this.setState({ fecSearchComplete: true });
    }
  }

  renderMatches() {
    const { candidateMatches, committeeMatches } = this.state;
    return (
      <Details>
        {candidateMatches.results.length === 0 &&
          committeeMatches.results.length === 0 && (
            <span>
              🚫 No matches for "{this.props.page.pageName}" in the FEC data
            </span>
          )}
        {candidateMatches.results.length > 0 && (
          <div>
            Candidate matches:
            <ul>
              {candidateMatches.results.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
        )}
        {committeeMatches.results.length > 0 && (
          <div>
            Committee matches:
            <ul>
              {committeeMatches.results.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </Details>
    );
  }

  render() {
    const { page, query, activatePage, activePage } = this.props;
    const { fecSearchComplete, noMatch } = this.state;

    return (
      <React.Fragment key={page.pageID}>
        <PageLink
          id={page.pageID}
          noMatch={noMatch}
          active={page.pageID === activePage.pageID}
          target="_blank"
          rel="noopener noreferrer"
          onClick={activatePage}
          href={ADS_URL.replace("QUERY_STR", query).replace(
            "PAGE_ID",
            page.pageID
          )}
        >
          {page.pageName}
          {fecSearchComplete || <Loading />}
        </PageLink>
      </React.Fragment>
    );
  }
}

export default PaidForBy;

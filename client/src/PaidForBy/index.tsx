import * as React from "react";

import { API_URL, ADS_URL } from "../constants";
import { Page, FECMatch } from "../../types"; 
import { Details, PageLink, Loading } from './styles'

interface Props {
  page: Page;
  query: string;
}

interface State {
  candidateMatches: FECMatch;
  committeeMatches: FECMatch;
  fecSearchComplete: boolean;
}

class PaidForBy extends React.Component<Props, State> {
  state: State = {
    candidateMatches: {
      results: []
    },
    committeeMatches: {
      results: []
    },
    fecSearchComplete: false
  };

  async componentDidMount() {
    const {
      page: { pageName }
    } = this.props;
    const response = await fetch(`${API_URL}/search-fec?q=${pageName}`, {
      mode: "cors"
    });
    const fecData = await response.json();
    console.log(`fecData`, fecData);
    this.setState({ ...fecData, fecSearchComplete: true });
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
    const { page, query } = this.props;
    const { fecSearchComplete } = this.state;

    return (
      <div key={page.pageID}>
        {/* <input */}
        {/*   type="checkbox" */}
        {/*   onChange={this.togglePageFilter} */}
        {/*   id={page.pageID} */}
        {/*   value={page.pageID} */}
        {/*   checked={!removedPages.includes(page.pageID)} */}
        {/* /> */}
        {/* <label htmlFor={page.pageID}>{page.pageName}</label> */}
        <PageLink
          target="_blank"
          rel="noopener noreferrer"
          href={ADS_URL.replace("QUERY_STR", query).replace(
            "PAGE_ID",
            page.pageID
          )}
        >
          {page.pageName} ↗
        </PageLink>
        {fecSearchComplete ? (
          this.renderMatches()
        ) : (
          <Loading>
            <div />
            <div />
          </Loading>
        )}
      </div>
    );
  }
}

export default PaidForBy;

import React, { Component } from "react";
import styled from "styled-components";

import { API_URL } from "./constants";

const ADS_URL =
  "https://www.facebook.com/ads/archive/?active_status=all&ad_type=political_and_issue_ads&country=US&page_ids[0]=PAGE_ID&q=QUERY_STR";

const PageLink = styled.a`
  font-weight: bold;
`;
const Details = styled.div`
  padding: 0 16px;
  font-size: 12px;
  ul {
    margin: 6px 0;
  }
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 14px;
  height: 14px;
  div {
    position: absolute;
    border: 4px solid #651515;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 6px;
      left: 6px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 12px;
      height: 12px;
      opacity: 0;
    }
  }
`;

class PaidForBy extends Component {
  state = {
    candidateMatches: [],
    committeeMatches: [],
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
          committeeMatches.results.length === 0 &&
          `No matches for "${this.props.page.pageName}" in the FEC data`}
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
    const {
      fecSearchComplete,
    } = this.state;

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

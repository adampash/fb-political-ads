import * as React from "react";

import { Icon, IconType } from "../Icon";
import { API_URL } from "../constants";
import { IAd, FECMatch } from "../../types";
import api from "../utils/cacheFetch";
import { Container, SubHead, FECMatches, ViewArchive } from "./styles";
import Ad from "../Ad";

interface Props {
  pageID: string;
  pageName: string;
  query: string;
}

interface State {
  data: {
    ads: IAd[];
    totalCount: number;
  };
  fecData: {
    committeeMatches: FECMatch;
    candidateMatches: FECMatch;
  };
  hasDeletedAds: boolean;
}

class PageDetails extends React.Component<Props, State> {
  defaultState = {
    data: {
      ads: [],
      totalCount: 0,
      initial: true,
    },
    fecData: {
      candidateMatches: { results: [] },
      committeeMatches: { results: [] },
      initial: true,
    },
    hasDeletedAds: false,
  };
  state = this.defaultState;
  componentWillMount() {
    this.fetchData(this.props.pageID, this.props.pageName);
  }

  componentWillReceiveProps({ pageID, pageName }: Props) {
    if (pageID !== this.props.pageID) {
      this.fetchData(pageID, pageName);
      this.setState(this.defaultState);
    }
  }

  async fetchData(id: string, name: string) {
    const { query } = this.props;

    const fecData = await api.searchFEC(name);
    this.setState({ fecData });
    const data = await api.adsForPage({ query, id });
    this.setState({ data });
  }

  flagDeleted = () => {
    this.setState({ hasDeletedAds: true });
  };

  render() {
    const { pageName, pageID } = this.props;
    const { data, fecData, hasDeletedAds } = this.state;
    const hasFecMatches =
      fecData.committeeMatches.results.length > 0 ||
      fecData.candidateMatches.results.length > 0;
    return (
      <Container>
        <h3>{pageName}</h3>
        <ul>
          <li>
            <a
              href={`https://facebook.com/${pageID}`}
              target="_blank"
              rel="noopener"
            >
              Page <Icon type={IconType.OpenInNew} />
            </a>
          </li>
          <li>
            <a
              href={`https://www.facebook.com/ads/archive/?active_status=all&ad_type=political_and_issue_ads&country=US&page_ids[0]=${pageID}&q=${pageName}`}
              target="_blank"
              rel="noopener"
            >
              Ad Archive <Icon type={IconType.OpenInNew} />
            </a>
          </li>
          <li>
            <a
              href={`https://facebook.com/${pageID}/ads`}
              target="_blank"
              rel="noopener"
            >
              Active Ads <Icon type={IconType.OpenInNew} />
            </a>
          </li>
          <li>
            RSS <Icon type={IconType.RSS} />
          </li>
        </ul>
        <SubHead>FEC Matches</SubHead>
        <FECMatches>
          {!hasFecMatches ? (
            "No matching candidate or committee in the FEC's data"
          ) : (
            <>
              <div>
                <b>Committee</b>{" "}
                {fecData.committeeMatches.results.length > 0
                  ? fecData.committeeMatches.results
                      .map(({ name }: { name: string }) => name)
                      .join(", ")
                  : "No committee matches"}
              </div>
              <div>
                <b>Candidate</b>{" "}
                {fecData.candidateMatches.results.length > 0
                  ? fecData.candidateMatches.results
                      .map(({ name }: { name: string }) => name)
                      .join(", ")
                  : "No candidate matches"}
              </div>
            </>
          )}
        </FECMatches>
        <SubHead>
          Recent ads{" "}
          {!data.initial && `(${data.ads.length} of ${data.totalCount})`}{" "}
          {hasDeletedAds && (
            <span>
              *includes
              <a
                href={`https://www.facebook.com/ads/archive/?active_status=all&ad_type=political_and_issue_ads&country=US&page_ids[0]=${pageID}&q=${pageName}`}
                target="_blank"
                rel="noopener"
              >
                pulled ads <Icon type={IconType.OpenInNew} />
              </a>
            </span>
          )}
        </SubHead>
        {data.initial
          ? "Loading..."
          : data.ads.map((ad: IAd) => (
              <Ad flagDeleted={this.flagDeleted} ad={ad} key={ad.adArchiveID} />
            ))}
        {!data.initial && (
          <ViewArchive
            href={`https://www.facebook.com/ads/archive/?active_status=all&ad_type=political_and_issue_ads&country=US&page_ids[0]=${pageID}&q=${pageName}`}
            target="_blank"
            rel="noopener"
          >
            View the archive <Icon type={IconType.OpenInNew} />
          </ViewArchive>
        )}
      </Container>
    );
  }
}

export default PageDetails;

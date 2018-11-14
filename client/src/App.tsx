import * as React from "react";
import queryString from "query-string";

import "./App.css";
import { Icon, IconType } from "./Icon";
import {
  Wrapper,
  Form,
  SearchInput,
  Container,
  Sidebar,
  Loading,
  Results,
  Alert,
} from "./styles";
import PaidForBy from "./PaidForBy";
import EmptyPage from "./EmptyPage";
import PageDetails from "./PageDetails";
import { API_URL } from "./constants";
import { Page } from "../types";
import api from "./utils/cacheFetch";

interface State {
  query: string;
  lastQuery: string | null;
  removedPages: [];
  data: {
    matchingPages: Page[];
  };
  loading: boolean;
  activePage: Page | null;
  fecOverLimit: boolean;
}

class App extends React.Component {
  state = {
    query: "",
    lastQuery: null,
    removedPages: [],
    data: {
      matchingPages: [],
    },
    loading: false,
    activePage: null,
    fecOverLimit: false,
  };
  componentDidMount() {
    const { q } = queryString.parse(window.location.search);
    if (q) {
      this.updatePageQuery();
      this.setState({ query: q }, () => this.fetchData());
    }
  }

  updateQuery = (e: React.SyntheticEvent<any>) => {
    const query = e.currentTarget.value;
    const search = `?q=${query}`;
    this.setState({ query, location: search, activePage: null });
  };

  fetchData = async (e?: React.SyntheticEvent<any>) => {
    this.setState({ loading: true });
    try {
      if (e) {
        e.preventDefault();
        this.updatePageQuery();
      }

      const data = await api.searchAds(this.state.query);
      // only update the matched pages array if the query has changed
      if (this.state.lastQuery === this.state.query) {
        this.setState({
          data: { ...data, matchingPages: this.state.data.matchingPages },
          lastQuery: this.state.query,
        });
      } else {
        this.setState({ data, lastQuery: this.state.query });
      }
    } catch (e) {
      console.log(`e`, e);
    } finally {
      this.setState({ loading: false });
    }
  };

  updatePageQuery() {
    window.history.pushState("", "", this.constructPageQuery());
  }

  setFECOverLimit = (fecOverLimit: boolean) => {
    this.setState({ fecOverLimit });
  };

  constructPageQuery(withFilter = false) {
    const { query, removedPages } = this.state;

    if (!query) return "";
    const pageUrl =
      "?q=" +
      query +
      (withFilter
        ? removedPages.length > 0
          ? `&filtered=${removedPages.join(",")}`
          : ""
        : "");
    return pageUrl;
  }

  viewPageDetails = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    const {
      data: { matchingPages },
    } = this.state;
    this.setState({
      activePage: matchingPages.find(
        ({ pageID }: Page) => pageID === e.currentTarget.id
      ),
    });
  };

  render() {
    const {
      data: { matchingPages },
      query,
      loading,
      activePage,
      fecOverLimit,
    } = this.state;
    return (
      <div>
        <Form onSubmit={this.fetchData}>
          <div>
            <SearchInput
              value={query}
              placeholder="Search for a page by name and hit 'Enter'"
              onChange={this.updateQuery}
            />
            <button>
              <Icon type={IconType.Search} />
            </button>
          </div>
        </Form>
        {loading && <Loading>Loading...</Loading>}
        <Wrapper>
          <Container>
            <Sidebar>
              {matchingPages.length === 0 && !loading
                ? "No matching pages"
                : matchingPages.map((page: Page) => (
                    <PaidForBy
                      page={page}
                      key={page.pageID}
                      activePage={activePage || { pageID: "" }}
                      query={query}
                      activatePage={this.viewPageDetails}
                      setFECOverLimit={this.setFECOverLimit}
                    />
                  ))}
            </Sidebar>
            <Results>
              {fecOverLimit && (
                <Alert>
                  <Icon type={IconType.Error} /> FEC API calls are currently
                  over our limit. For FEC data, try back in about an hour
                </Alert>
              )}
              {activePage ? (
                <PageDetails
                  {...activePage}
                  query={query}
                  setFECOverLimit={this.setFECOverLimit}
                />
              ) : (
                <EmptyPage fecOverLimit={fecOverLimit} />
              )}
            </Results>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

export default App;

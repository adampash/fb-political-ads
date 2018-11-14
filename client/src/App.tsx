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
      console.log(`data`, data);
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

  // togglePageFilter = e => {
  //   const page = e.currentTarget.value;
  //   const { removedPages } = this.state;
  //   const updatedPages = removedPages.includes(page)
  //     ? removedPages.filter(id => id !== page)
  //     : [...removedPages, page];
  //
  //   this.setState(
  //     {
  //       removedPages: updatedPages
  //     },
  //     () => {
  //       this.updatePageQuery();
  //       this.fetchData();
  //     }
  //   );
  // };
  viewPageDetails = (e: React.SyntheticEvent<any>) => {
    console.log(`e.currentTarget.id`, e.currentTarget.id);
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
    } = this.state;
    return (
      <div>
        <Form onSubmit={this.fetchData}>
          <div>
            <SearchInput
              value={query}
              placeholder="Search for a politician and hit 'Enter'"
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
                    />
                  ))}
            </Sidebar>
            <Results>
              {activePage ? <PageDetails {...activePage} query={query} /> : <EmptyPage />}
            </Results>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

export default App;

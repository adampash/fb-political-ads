import * as React from "react";
import queryString from "query-string";

import "./App.css";
import {
  Wrapper,
  Form,
  SearchInput,
  Container,
  Sidebar,
  Loading,
  Results
} from "./styles";
import PaidForBy from "./PaidForBy";
import PageDetails from "./PageDetails";
import { API_URL } from "./constants";
import { Page } from "../types";

interface State {
  query: string;
  lastQuery: string | null;
  removedPages: [];
  data: {
    matchingPages: Page[];
  };
  loading: boolean;
}

class App extends React.Component {
  state = {
    query: "",
    lastQuery: null,
    removedPages: [],
    data: {
      matchingPages: []
    },
    loading: false
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
    this.setState({ query, location: search });
  };

  fetchData = async (e?: React.SyntheticEvent<any>) => {
    this.setState({ loading: true });
    try {
      if (e) {
        e.preventDefault();
        this.updatePageQuery();
      }

      const pageQuery = this.constructPageQuery(true);

      const response = await fetch(`${API_URL}/search-ads${pageQuery}`, {
        mode: "cors"
      });
      const data = await response.json();
      console.log(`data`, data);
      // only update the matched pages array if the query has changed
      if (this.state.lastQuery === this.state.query) {
        this.setState({
          data: { ...data, matchingPages: this.state.data.matchingPages },
          lastQuery: this.state.query
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

  render() {
    const {
      data: { matchingPages },
      query,
      loading
    } = this.state;
    return (
      <div>
        <Form onSubmit={this.fetchData}>
          <SearchInput
            value={query}
            placeholder="Search for a politician and hit 'Enter'"
            onChange={this.updateQuery}
          />
        </Form>
        {loading && <Loading>Loading...</Loading>}
        <Wrapper>
          <Container>
            <Sidebar>
              <h4>Matching pages</h4>
              {matchingPages.length === 0 && !loading
                ? "No matching pages"
                : matchingPages.map((page: Page) => (
                    <PaidForBy page={page} key={page.pageID} query={query} />
                  ))}
            </Sidebar>
            <Results>
              <h4>Results</h4>
              <PageDetails name="foo" />
            </Results>
          </Container>
        </Wrapper>
      </div>
    );
  }
}

export default App;

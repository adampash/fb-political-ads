import React, { Component } from "react";
import queryString from "query-string";
import "./App.css";
import {
  Wrapper,
  Form,
  SearchInput,
  Container,
  Sidebar,
  Results,
  Loading
} from "./styles";

const API_URL = process.env.API_URL || "http://localhost:3000";
const ADS_URL =
  "https://www.facebook.com/ads/archive/?active_status=all&ad_type=political_and_issue_ads&country=US&page_ids[0]=PAGE_ID&q=QUERY_STR";

class App extends Component {
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
    console.log(`q`, q);
    this.updatePageQuery();
    this.setState({ query: q }, () => this.fetchData());
  }

  updateQuery = e => {
    const query = e.currentTarget.value;
    const search = `?q=${query}`;
    this.setState({ query, location: search });
  };

  fetchData = async e => {
    this.setState({ loading: true });
    try {
      if (e) {
        e.preventDefault();
        this.updatePageQuery();
      }

      const pageQuery = this.constructPageQuery(true);

      const response = await fetch(`${API_URL}/search-ads${pageQuery}`);
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

  togglePageFilter = e => {
    const page = e.currentTarget.value;
    const { removedPages } = this.state;
    const updatedPages = removedPages.includes(page)
      ? removedPages.filter(id => id !== page)
      : [...removedPages, page];

    this.setState(
      {
        removedPages: updatedPages
      },
      () => {
        this.updatePageQuery();
        this.fetchData();
      }
    );
  };

  render() {
    const {
      data: { matchingPages },
      query,
      removedPages,
      loading
    } = this.state;
    return (
      <>
        <Form onSubmit={this.fetchData}>
          <SearchInput value={query} onChange={this.updateQuery} />
        </Form>
        {loading && <Loading>Loading...</Loading>}
        <Wrapper>
          <Container>
            <Sidebar>
              <h4>Matching pages</h4>
              {matchingPages.length === 0 && !loading
                ? "No matching pages"
                : matchingPages.map(page => (
                    <div key={page.pageID}>
                      {/* <input */}
                      {/*   type="checkbox" */}
                      {/*   onChange={this.togglePageFilter} */}
                      {/*   id={page.pageID} */}
                      {/*   value={page.pageID} */}
                      {/*   checked={!removedPages.includes(page.pageID)} */}
                      {/* /> */}
                      {/* <label htmlFor={page.pageID}>{page.pageName}</label> */}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={ADS_URL.replace("QUERY_STR", query).replace(
                          "PAGE_ID",
                          page.pageID
                        )}
                      >
                        {page.pageName}   ↗
                      </a>
                    </div>
                  ))}
            </Sidebar>
            {/* <Results> */}
            {/*   <h4>Results</h4> */}
            {/* </Results> */}
          </Container>
        </Wrapper>
      </>
    );
  }
}

export default App;

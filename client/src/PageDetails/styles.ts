import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  h3 {
    margin: 0;
    border-bottom: 2px solid;
    padding: 15px 0;
  }
  ul {
    padding: 12px 0;
    margin: 0;
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    li {
      list-style: none;
      a {
        text-decoration: none;
        color: inherit;
      }
      i {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
`;

export const SubHead = styled.h4`
  border-bottom: 1px solid;
  font-weight: normal;
  padding: 12px 0;
  span {
    color: red;
    font-size: 12px;
    a {
      text-decoration: none;
      color: inherit;
      margin-left: 3px;
    }
    i {
      font-size: 12px;
    }
  }
`;

export const FECMatches = styled.div`
  display: flex;
  font-size: 12px;
  div {
    width: calc(50% - 16px);
    padding: 0 6px 0 0;
  }
`;

export const ViewArchive = styled.a`
  align-self: center;
  text-decoration: none;
  background: black;
  color: white;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  i {
    margin-left: 16px;
  }
`;

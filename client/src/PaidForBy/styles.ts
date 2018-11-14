import styled from "styled-components";

interface PageLinkProps {
  noMatch: boolean;
  active: boolean;
}
export const PageLink = styled<PageLinkProps, "a">("a")`
  position: relative;
  display: block;
  padding: 6px 3px 6px 0;
  width: 275px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 2px solid #fff;
  border-top: 2px solid #fff;
  ${({ active }) =>
    active &&
    `
    font-weight: bold;
    border-bottom: 2px solid black;
    border-top: 2px solid black;
    padding: 16px 3px;
  `};
  transition: padding 0.2s, border 0.2s;
  ${({ noMatch }) =>
    noMatch &&
    `
    &:after {
      content "*";
      color: red;
    }
  `};
`;
export const Details = styled.div`
  padding: 0 16px;
  font-size: 12px;
  ul {
    margin: 6px 0;
  }
  span {
    color: #651515;
    font-weight: bold;
  }
`;

export const Loading = styled.span`
  &:after {
    content: "|";
  }
  margin-left: 10px;
  position: absolute;
  right: 0;
  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

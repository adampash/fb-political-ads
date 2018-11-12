import styled from "styled-components";

export const PageLink = styled.a`
  font-weight: bold;
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

export const Loading = styled.div`
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


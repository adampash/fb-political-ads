import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 80px 0;
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  width: 100%;
  border: 1px solid #eee;
  position: fixed;
  top: 0;
  padding: 16px;
  z-index: 100;
  background: white;
  div {
    margin: 0 auto;
    max-width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      flex-shrink: 0;
      cursor: pointer;
      width: 60px;
      border: none;
      outline: none;
      background: black;
      color: white;
      font-size: 14px;
      border-radius: 0 2px 2px 0;
      align-self: stretch;
    }
  }
`;

export const SearchInput = styled.input`
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  padding: 13px;
  border: 1px solid #eee;
  font-size: 14px;
  outline: none;
  z-index: 100;
`;

export const Container = styled.main`
  display: flex;
  padding: 16px;
  width: 1000px;
  max-width: 100%;
`;

export const Sidebar = styled.div`
  position: fixed;
  margin-left: -16px;
  label {
    font-size: 12px;
  }
  a {
    color: #111;
    text-decoration: none;
  }
  div {
    margin: 8px 0;
  }
`;

export const Results = styled.div`
  max-width: 100%;
  flex-grow: 1;
  margin-left: 275px;
`;

export const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 32px;
  background: white;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Alert = styled.div`
  display: flex;
  align-items: center;
  background: #F9A825;
  font-weight: bold;
  color: white;
  font-size: 14px;
  padding: 16px;
  margin-bottom: 16px;
  i {
    margin-right: 16px;
  }
`;


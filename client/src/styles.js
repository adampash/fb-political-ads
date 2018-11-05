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
  position: fixed;
  top: 0;
  padding: 16px;
  display: flex;
  justify-content: center;
`;

export const SearchInput = styled.input`
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  padding: 12px;
  border-radius: 2px;
  font-size: 14px;
  border: 1px solid #eee;
  outline: none;
`;

export const Container = styled.main`
  display: flex;
  padding: 16px;
`;

export const Sidebar = styled.div`
  label {
    font-size: 12px;
  }
  a {
    color: #111;
    text-decoration: none;
    &:hover {
      color: #651515;
    }
  }
  div {
    margin: 8px 0;
  }
`;

export const Results = styled.div``;

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

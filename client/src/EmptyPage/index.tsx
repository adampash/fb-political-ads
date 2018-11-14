import * as React from "react";
import styled from "styled-components";

import { Icon, IconType } from "../Icon";
interface Props {}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  i {
    margin: 0 16px;
  }
  div {
    margin-top: 3px;
  }
`;

const Asterisk = styled.div`
  font-size: 14px;
  padding: 16px 0;
  &:before {
    content: "*";
    color: red;
  }
`;

const EmptyPage = (props: Props) => (
  <>
    <Container>
      <Icon type={IconType.ArrowBack} />{" "}
      <div>
        Click on a page to view more details
        <Asterisk>Indicates page name cannot be found in FEC data</Asterisk>
      </div>
    </Container>
  </>
);

export default EmptyPage;

import * as React from "react";
import styled from "styled-components";

import { Icon, IconType } from "../Icon";
interface Props {}

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  i {
    margin: 0 16px;
  }
`;

const EmptyPage = (props: Props) => (
  <Container>
    <Icon type={IconType.ArrowBack} /> Click on a page to view more details
  </Container>
);

export default EmptyPage;

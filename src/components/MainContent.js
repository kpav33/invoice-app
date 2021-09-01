import React from "react";
import styled from "styled-components";

import ActionBar from "./ActionBar";
import Invoices from "./Invoices";

export default function MainContent() {
  return (
    <StyledMain>
      <ActionBar />
      <Invoices />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  padding: 32px 24px;
`;

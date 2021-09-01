import React from "react";
import styled from "styled-components";

import Invoice from "./Invoice";

export default function Invoices() {
  return (
    <StyledInvoicesDiv>
      <Invoice />
      <Invoice />
      <Invoice />
      <Invoice />
    </StyledInvoicesDiv>
  );
}

const StyledInvoicesDiv = styled.div`
  display: grid;
  grid-template: auto / auto;
  margin-top: 32px;
`;

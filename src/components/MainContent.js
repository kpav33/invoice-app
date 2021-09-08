import React from "react";
import styled from "styled-components";

import ActionBar from "./ActionBar";
import Invoices from "./Invoices";

export default function MainContent({ allInvoices, setAllInvoices }) {
  return (
    <StyledMain>
      <ActionBar allInvoices={allInvoices} setAllInvoices={setAllInvoices} />
      <Invoices allInvoices={allInvoices} setAllInvoices={setAllInvoices} />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  padding: 32px 24px;
`;

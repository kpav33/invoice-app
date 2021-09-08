import React, { useState } from "react";
import styled from "styled-components";

import ActionBar from "./ActionBar";
import Invoices from "./Invoices";
import NewInvoice from "./NewInvoice";

export default function MainContent({ allInvoices, setAllInvoices }) {
  const [createNewInvoice, setCreateNewInvoice] = useState(false);

  return (
    <StyledMain>
      {!createNewInvoice && (
        <>
          <ActionBar
            allInvoices={allInvoices}
            setAllInvoices={setAllInvoices}
            setCreateNewInvoice={setCreateNewInvoice}
          />
          <Invoices allInvoices={allInvoices} setAllInvoices={setAllInvoices} />
        </>
      )}
      {createNewInvoice && (
        <NewInvoice
          setCreateNewInvoice={setCreateNewInvoice}
          setAllInvoices={setAllInvoices}
        />
      )}
    </StyledMain>
  );
}

const StyledMain = styled.main`
  padding: 32px 24px;
`;

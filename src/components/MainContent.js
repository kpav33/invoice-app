import React, { useState } from "react";
import styled from "styled-components";

import ActionBar from "./ActionBar";
import Invoices from "./Invoices";
import NewInvoice from "./NewInvoice";

export default function MainContent({ allInvoices, setAllInvoices, width }) {
  const [createNewInvoice, setCreateNewInvoice] = useState(false);
  const [filter, setFilter] = useState("all");

  function handleChange(event) {
    const { value } = event.target;
    setFilter(value);
  }

  //console.log(filter);

  return (
    <StyledMain>
      {!createNewInvoice && (
        <>
          <ActionBar
            allInvoices={allInvoices}
            setAllInvoices={setAllInvoices}
            setCreateNewInvoice={setCreateNewInvoice}
            filter={filter}
            setFilter={setFilter}
            handleChange={handleChange}
            width={width}
          />
          <Invoices
            allInvoices={allInvoices}
            setAllInvoices={setAllInvoices}
            filter={filter}
            width={width}
          />
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

  @media only screen and (min-width: 900px) {
    width: 100%;
    margin: 3% 20% 0% 15%;
  }
`;

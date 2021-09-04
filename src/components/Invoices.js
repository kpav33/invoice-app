import React, { useState } from "react";
import styled from "styled-components";
import data from "../data.json";

import Invoice from "./Invoice";

export default function Invoices() {
  //console.log(data);
  const [dataT, setData] = useState(data);
  console.log(dataT);

  let invoicesArr = dataT.map((invoice) => (
    <Invoice
      key={invoice.id}
      id={invoice.id}
      due={invoice.paymentDue}
      name={invoice.clientName}
      total={invoice.total}
      status={invoice.status}
    />
  ));

  return <StyledInvoicesDiv>{invoicesArr}</StyledInvoicesDiv>;
}

const StyledInvoicesDiv = styled.div`
  display: grid;
  grid-template: auto / auto;
  margin-top: 32px;
  grid-gap: 16px;
`;

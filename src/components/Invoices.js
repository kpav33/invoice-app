import React from "react";
import styled from "styled-components";
import { ReactComponent as SvgEmpty } from "../assets/illustration-empty.svg";
//import data from "../data.json";

import Invoice from "./Invoice";

export default function Invoices({
  allInvoices,
  setAllInvoices,
  filter,
  width,
}) {
  //console.log(data);
  //const [allInvoices, setAllInvoices] = useState(data);
  //console.log(allInvoices);

  let invoicesArr = allInvoices
    .filter((invoice) => {
      if (filter === "paid") {
        return invoice.status === "paid";
      } else if (filter === "pending") {
        return invoice.status === "pending";
      } else if (filter === "draft") {
        return invoice.status === "draft";
      } else {
        return invoice;
      }
    })
    .map((invoice) => (
      <Invoice
        key={invoice.id}
        id={invoice.id}
        due={invoice.paymentDue}
        name={invoice.clientName}
        total={invoice.total}
        status={invoice.status}
        invoiceObj={invoice}
        allInvoices={allInvoices}
        setAllInvoices={setAllInvoices}
        width={width}
      />
    ));

  let noInvoicesLeft = (
    <StyledNoInvoicesLeftDiv>
      <SvgEmpty />
      <h3>There is nothing here</h3>
      <p>
        Create an invoice by clicking the <strong>New</strong> button and get
        started
      </p>
    </StyledNoInvoicesLeftDiv>
  );

  return (
    <StyledInvoicesDiv>
      {invoicesArr.length > 0 ? invoicesArr : noInvoicesLeft}
    </StyledInvoicesDiv>
  );
}

const StyledInvoicesDiv = styled.div`
  display: grid;
  grid-template: auto / auto;
  margin-top: 32px;
  grid-gap: 16px;

  @media only screen and (min-width: 900px) {
    margin-top: 64px;
  }
`;

const StyledNoInvoicesLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 0 auto;
  margin-top: 70px;

  @media only screen and (min-width: 900px) {
    margin-top: 6px;
  }

  h3 {
    margin: 40px 0px 24px 0px;
    font-size: 20px;
    letter-spacing: -0.63px;
  }

  p {
    text-align: center;
    color: var(--date-text-light);
  }
`;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Invoice({
  id,
  due,
  name,
  total,
  status,
  invoiceObj,
  allInvoices,
  setAllInvoices,
}) {
  let totalFormatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(total);

  let statusCapitalized = status[0].toUpperCase() + status.slice(1);

  let statusBackgroundColor, statusColor;
  if (status === "pending") {
    statusBackgroundColor = "rgba(255, 143, 0, 0.06)";
    statusColor = "#FF8F00";
  } else if (status === "draft") {
    statusBackgroundColor = "rgba(55, 59, 83, 0.06)";
    statusColor = "#373B53";
  } else {
    statusBackgroundColor = "rgba(51, 214, 159, 0.06)";
    statusColor = "#33d69f";
  }

  //let date = new Date(due);
  //console.log(date.toUTCString());
  let subpageId = id;
  //console.log(invoiceObj);
  //console.log(setAllInvoices);

  return (
    <InvoiceLink
      to={{
        pathname: `/invoice/${subpageId}`,
        state: [invoiceObj],
      }}
    >
      <StyledInvoiceDiv>
        <StyledIdPara>
          <span>#</span>
          {id}
        </StyledIdPara>
        <StyledDatePara>
          <span>Due</span> {due}
        </StyledDatePara>
        <StyledNamePara>{name}</StyledNamePara>
        <StyledValuePara>{totalFormatted}</StyledValuePara>
        <StyledStatusDiv
          backgroundColor={statusBackgroundColor}
          color={statusColor}
        >
          <span className="dot"></span>
          {statusCapitalized}
        </StyledStatusDiv>
      </StyledInvoiceDiv>
    </InvoiceLink>
  );
}

const InvoiceLink = styled(Link)`
  text-decoration: none;
`;

const StyledInvoiceDiv = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 7px;
  display: grid;
  grid-template-rows: 1.5fr 1fr 1fr;
  //grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  grid-template-areas:
    "id name"
    "date status"
    "value status";

  p {
    //padding: 0;
    margin: 0;
  }
`;

const StyledIdPara = styled.p`
  font-weight: bold;
  color: var(--text-light-black);
  grid-area: id;

  span {
    color: var(--text-light-form);
  }
`;

const StyledDatePara = styled.p`
  color: var(--text-light-form);
  grid-area: date;

  span {
    color: var(--date-text-light);
  }
`;

const StyledNamePara = styled.p`
  color: #858bb2;
  text-align: right;
  grid-area: name;
  //align-self: flex-end;
`;

const StyledValuePara = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  letter-spacing: -0.8px;
  color: var(--text-light-black);
  grid-area: value;
`;

const StyledStatusDiv = styled.div`
  color: ${(props) => props.color};
  font-weight: bold;
  background: ${(props) => props.backgroundColor};
  border-radius: 6px;
  width: 104px;
  padding: 13px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: status;

  .dot {
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
  }
`;

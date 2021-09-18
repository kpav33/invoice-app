import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../assets/icon-arrow-right.svg";

export default function Invoice({
  id,
  due,
  name,
  total,
  status,
  invoiceObj,
  allInvoices,
  setAllInvoices,
  width,
}) {
  console.log(
    new Date(new Date(due).getTime()).toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );

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
        <StyledDatePara>{`Due ${new Date(
          new Date(due).getTime()
        ).toLocaleString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`}</StyledDatePara>
        <StyledNamePara>{name}</StyledNamePara>
        <StyledValuePara>{totalFormatted}</StyledValuePara>
        <StyledStatusDiv
          backgroundColor={statusBackgroundColor}
          color={statusColor}
        >
          <span className="dot"></span>
          {statusCapitalized}
        </StyledStatusDiv>
        {width > 450 && <ArrowRight />}
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

  @media only screen and (min-width: 900px) {
    grid-template: 1fr / 1fr 1.5fr 2fr 1fr 1fr 10px;
    grid-template-areas: "id date name value status";
    align-items: center;
    justify-items: flex-start;
    grid-gap: 45px;
  }
`;

const StyledIdPara = styled.p`
  font-weight: bold;
  color: var(--text-light-black);
  grid-area: id;
  margin: 0;

  span {
    color: var(--text-light-form);
  }

  @media only screen and (min-width: 900px) {
    //margin-left: 32px;
  }
`;

const StyledDatePara = styled.p`
  color: var(--text-light-form);
  grid-area: date;
  margin: 0;

  /* span {
    color: var(--date-text-light);
    @media only screen and (min-width: 900px) {
      margin-right: 10px;
    }
  } */

  @media only screen and (min-width: 900px) {
    //margin: 0px 0px 0px 43px;
    //width: 100%;
    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    text-align: left;
    //align-self: flex-start;
    //justify-items: flex-start;
    justify-self: flex-start;
  }
`;

const StyledNamePara = styled.p`
  color: #858bb2;
  text-align: right;
  grid-area: name;
  //align-self: flex-end;
  margin: 0;

  @media only screen and (min-width: 900px) {
    //margin: 0px 73px 0px 45px;
    text-align: left;
    //width: 100%;
    //margin-left: 70px;
    justify-self: flex-start;
  }
`;

const StyledValuePara = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  letter-spacing: -0.8px;
  color: var(--text-light-black);
  grid-area: value;
  margin: 0;

  @media only screen and (min-width: 900px) {
    //margin: 0px 40px 0px 73px;
    //text-align: right;
    justify-self: flex-end;
  }
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
  margin: 0;

  @media only screen and (min-width: 900px) {
    //margin-right: 48px;
  }

  .dot {
    height: 8px;
    width: 8px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
  }
`;

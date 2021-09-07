import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/icon-arrow-left.svg";

export default function ViewInvoice() {
  let { state } = useLocation();
  console.log(state);

  let statusCapitalized = state.status[0].toUpperCase() + state.status.slice(1);

  let uniqueId = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  let statusBackgroundColor, statusColor;
  if (state.status === "pending") {
    statusBackgroundColor = "rgba(255, 143, 0, 0.06)";
    statusColor = "#FF8F00";
  } else if (state.status === "draft") {
    statusBackgroundColor = "rgba(55, 59, 83, 0.06)";
    statusColor = "#373B53";
  } else {
    statusBackgroundColor = "rgba(51, 214, 159, 0.06)";
    statusColor = "#33d69f";
  }

  let receiptItems = state.items.map((item) => (
    <StyledReceiptItemsDiv key={uniqueId()}>
      <div>
        <p className="black">{item.name}</p>
        <p>{`${item.quantity} x € ${item.price}`}</p>
      </div>
      <p className="black">{`€ ${item.total}`}</p>
    </StyledReceiptItemsDiv>
  ));
  console.log(receiptItems);

  return (
    <>
      <StyledViewInvoiceDiv>
        <StyledBackLink to="/">
          <ArrowLeft /> Go back
        </StyledBackLink>
        <StyledStatusDiv>
          <p>Status</p>
          <StyledStatusStateDiv
            backgroundColor={statusBackgroundColor}
            color={statusColor}
          >
            <span className="dot"></span>
            {statusCapitalized}
          </StyledStatusStateDiv>
        </StyledStatusDiv>
        <StyledInvoiceInfoDiv>
          <StyledDivId>
            <p>
              <span>#</span>
              {state.id}
            </p>
            <p>{state.description}</p>
          </StyledDivId>
          <StyledSenderAddressDiv>
            <p>{state.senderAddress.street}</p>
            <p>{state.senderAddress.city}</p>
            <p>{state.senderAddress.postCode}</p>
            <p>{state.senderAddress.country}</p>
          </StyledSenderAddressDiv>
          <StyledDateClientDiv>
            <StyledDateDiv>
              <p>Invoice Date</p>
              <p className="bold">{state.createdAt}</p>
              <p>Payment Due</p>
              <p className="bold">{state.paymentDue}</p>
            </StyledDateDiv>
            <StyledBillToDiv>
              <p>Bill To</p>
              <p className="bold">{state.clientName}</p>
              <p>{state.clientAddress.street}</p>
              <p>{state.clientAddress.city}</p>
              <p>{state.clientAddress.postCode}</p>
              <p>{state.clientAddress.country}</p>
            </StyledBillToDiv>
          </StyledDateClientDiv>
          <StyledSentToDiv>
            <p>Sent to</p>
            <p>{state.clientEmail}</p>
          </StyledSentToDiv>
          <StyledReceiptDiv>
            <StyledRecepitItemsContainerDiv>
              {receiptItems}
            </StyledRecepitItemsContainerDiv>
            <StyledGrandTotalContainer>
              <p>Grand Total</p>
              <p>{`€ ${state.total}`}</p>
            </StyledGrandTotalContainer>
          </StyledReceiptDiv>
        </StyledInvoiceInfoDiv>
      </StyledViewInvoiceDiv>
      <StyledManageInvoiceBar>
        <StyledMangeInvoiceButton backgroundColor="#F9FAFE" color="#7E88C3">
          Edit
        </StyledMangeInvoiceButton>
        <StyledMangeInvoiceButton backgroundColor="#EC5757" color="#FFFFFF">
          Delete
        </StyledMangeInvoiceButton>
        <StyledMangeInvoiceButton backgroundColor="#7C5DFA" color="#FFFFFF">
          Mark as Paid
        </StyledMangeInvoiceButton>
      </StyledManageInvoiceBar>
    </>
  );
}

const StyledViewInvoiceDiv = styled.div`
  padding: 32px 0px 0px 0px;
  margin: 0px 24px;
`;

const StyledBackLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  //margin: 0 24px;

  &:active,
  :visited,
  :active,
  :link {
    color: initial;
  }

  svg {
    margin-right: 28px;
  }
`;

const StyledStatusDiv = styled.div`
  background: #fff;
  padding: 24px;
  margin-top: 32px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  //margin: 32px 24px 16px 32px;

  & > p {
    color: #858bb2;
  }
`;

const StyledStatusStateDiv = styled.div`
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
const StyledInvoiceInfoDiv = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  color: var(--text-light-form);
`;

const StyledDivId = styled.div`
  font-weight: bold;
  color: var(--text-light-black);

  span {
    color: var(--text-light-form);
  }

  p:nth-child(1) {
    margin: 0;
    margin-bottom: 4px;
  }

  p:nth-child(2) {
    color: var(--text-light-form);
    font-weight: normal;
    margin: 0;
    //margin-bottom: 30px;
  }
`;

const StyledSenderAddressDiv = styled.div`
  margin: 30px 0px;

  p {
    margin: 0;
    line-height: 18px;
    font-size: 11px;
  }
`;

const StyledDateClientDiv = styled.div`
  display: grid;
  //flex-direction: row;
  //justify-content: space-between;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 41px;

  .bold {
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.31px;
    font-weight: bold;
    color: var(--text-light-black);
  }
`;

const StyledDateDiv = styled.div`
  p:nth-child(3) {
    margin-top: 32px;
  }
`;

const StyledBillToDiv = styled.div`
  p:nth-child(3),
  p:nth-child(4),
  p:nth-child(5),
  p:nth-child(6) {
    margin: 0;
    line-height: 1.5;
    font-size: 11px;
  }
`;

const StyledSentToDiv = styled.div`
  margin-top: 32px;

  p:nth-child(1) {
    margin: 0;
  }

  p:nth-child(2) {
    font-weight: bold;
    color: var(--text-light-black);
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.31px;
    margin: 12px 0px 0px 0px;
  }
`;

const StyledReceiptDiv = styled.div`
  margin-top: 40px;
  //padding: 24px;
`;

const StyledRecepitItemsContainerDiv = styled.div`
  background: #f9fafe;
  border-radius: 10px 10px 0px 0px;
  padding: 12px 24px;
`;

const StyledReceiptItemsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  .black {
    color: var(--text-light-black);
  }
`;

const StyledGrandTotalContainer = styled.div`
  background: #373b53;
  border-radius: 0px 0px 10px 10px;
  padding: 0px 24px;
  color: #fff;
  font-size: 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p:nth-child(2) {
    font-weight: bold;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.42px;
  }
`;

const StyledManageInvoiceBar = styled.div`
  margin-top: 56px;
  background: #fff;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledMangeInvoiceButton = styled.button`
  border: none;
  background: ${(props) => props.backgroundColor};
  padding: 17px 24px;
  font-family: "Spartan", sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
  line-height: 15px;
  letter-spacing: -0.25px;
  border-radius: 25px;

  &:hover {
    cursor: pointer;
  }
`;

import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/icon-arrow-left.svg";

export default function ViewInvoice({ allInvoices, setAllInvoices }) {
  let { state } = useLocation();
  let [invoice] = state;
  //console.log(state);
  //console.log(allInvoices);
  //console.log(setAllInvoices);

  /**
   * function handleDeleteClick(event) {
    let targetId =
      event.target.parentNode.childNodes[0].children[0].childNodes[0].id;
    setStoredTodos((prevState) => {
      const updatedTodos = prevState.filter((todo) => todo.id !== targetId);
      return updatedTodos;
    });
  }
   */

  console.log(allInvoices);
  console.log(invoice.id);

  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  let currInvoiceId = invoice.id;

  function handleDeleteClick() {
    setAllInvoices((prevState) => {
      const updatedInvoices = prevState.filter(
        (invoice) => invoice.id !== currInvoiceId
      );
      return updatedInvoices;
    });
  }

  function handleMarkAsPaidClick() {
    setAllInvoices((prevState) => {
      const updatedInvoices = prevState.map((invoice) => {
        if (invoice.id === currInvoiceId) {
          console.log(invoice.status);
          invoice.status = "paid";
        }
        return invoice;
      });
      return updatedInvoices;
    });
  }

  let statusCapitalized =
    invoice.status[0].toUpperCase() + invoice.status.slice(1);

  let uniqueId = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  let statusBackgroundColor, statusColor;
  if (invoice.status === "pending") {
    statusBackgroundColor = "rgba(255, 143, 0, 0.06)";
    statusColor = "#FF8F00";
  } else if (invoice.status === "draft") {
    statusBackgroundColor = "rgba(55, 59, 83, 0.06)";
    statusColor = "#373B53";
  } else {
    statusBackgroundColor = "rgba(51, 214, 159, 0.06)";
    statusColor = "#33d69f";
  }

  let receiptItems = invoice.items.map((item) => (
    <StyledReceiptItemsDiv key={uniqueId()}>
      <div>
        <p className="black">{item.name}</p>
        <p>{`${item.quantity} x € ${item.price}`}</p>
      </div>
      <p className="black">{`€ ${item.total}`}</p>
    </StyledReceiptItemsDiv>
  ));
  //console.log(receiptItems);

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
              {invoice.id}
            </p>
            <p>{invoice.description}</p>
          </StyledDivId>
          <StyledSenderAddressDiv>
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </StyledSenderAddressDiv>
          <StyledDateClientDiv>
            <StyledDateDiv>
              <p>Invoice Date</p>
              <p className="bold">{invoice.createdAt}</p>
              <p>Payment Due</p>
              <p className="bold">{invoice.paymentDue}</p>
            </StyledDateDiv>
            <StyledBillToDiv>
              <p>Bill To</p>
              <p className="bold">{invoice.clientName}</p>
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </StyledBillToDiv>
          </StyledDateClientDiv>
          <StyledSentToDiv>
            <p>Sent to</p>
            <p>{invoice.clientEmail}</p>
          </StyledSentToDiv>
          <StyledReceiptDiv>
            <StyledRecepitItemsContainerDiv>
              {receiptItems}
            </StyledRecepitItemsContainerDiv>
            <StyledGrandTotalContainer>
              <p>Grand Total</p>
              <p>{`€ ${invoice.total}`}</p>
            </StyledGrandTotalContainer>
          </StyledReceiptDiv>
        </StyledInvoiceInfoDiv>
      </StyledViewInvoiceDiv>
      <StyledManageInvoiceBar>
        <StyledManageInvoiceButton backgroundColor="#F9FAFE" color="#7E88C3">
          Edit
        </StyledManageInvoiceButton>
        <StyledManageInvoiceButton
          backgroundColor="#EC5757"
          color="#FFFFFF"
          onClick={() => setShowDeleteMessage(true)}
        >
          Delete
        </StyledManageInvoiceButton>
        {invoice.status !== "paid" && (
          <StyledManageInvoiceButton
            backgroundColor="#7C5DFA"
            color="#FFFFFF"
            onClick={handleMarkAsPaidClick}
          >
            Mark as Paid
          </StyledManageInvoiceButton>
        )}
      </StyledManageInvoiceBar>
      {showDeleteMessage && (
        <StyledDeleteInvoiceDiv>
          <h3>Confirm Deletion</h3>
          <p>
            Are your sure you want to delete invoice {`#${invoice.id}`}? This
            action cannot be undone.
          </p>
          <div>
            <StyledManageInvoiceButton
              backgroundColor="#F9FAFE"
              color="#7E88C3"
              onClick={() => setShowDeleteMessage(false)}
            >
              Cancel
            </StyledManageInvoiceButton>
            <Link to="/">
              <StyledManageInvoiceButton
                backgroundColor="#EC5757"
                color="#FFFFFF"
                onClick={() => {
                  setShowDeleteMessage(false);
                  handleDeleteClick();
                }}
              >
                Delete
              </StyledManageInvoiceButton>
            </Link>
          </div>
        </StyledDeleteInvoiceDiv>
      )}
    </>
  );
}

const StyledViewInvoiceDiv = styled.div`
  padding: 32px 0px 0px 0px;
  margin: 0px 24px;
  position: relative;
  //background: red;
  //z-index: 9999;
  //background-color: hsla(0, 0%, 0%);
  //background-color: gray;
  //opacity: 0.5;
  //z-index: 1;
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

const StyledManageInvoiceButton = styled.button`
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

const StyledDeleteInvoiceDiv = styled.div`
  position: absolute;
  top: 60%;
  left: 6%;
  right: 6%;
  background: #fff;
  padding: 32px;
  border-radius: 10px;
  border: 2px solid black;
  //z-index: 9999;
  //opacity: 0;

  h3 {
    margin: 0;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.42px;
  }

  p {
    color: var(--date-text-light);
    //font-size: 12px;
    line-height: 22px;
  }

  div {
    margin-top: 24px;
    margin-left: 60px;
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    grid-gap: 8px;
  }

  button {
    width: 90px;
  }
`;

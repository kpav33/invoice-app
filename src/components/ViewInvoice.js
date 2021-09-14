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

  //console.log(allInvoices);
  //console.log(invoice.id);

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
          //console.log(invoice.status);
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

  const [editInvoice, setEditInvoice] = useState(false);

  //console.log(editInvoice);

  function uniqueID() {
    let char =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let num = Math.floor(1000 + Math.random() * 9000);
    return char + num;
  }

  //let formObject = invoice;
  const [itemsArray, setItemsArray] = useState(invoice.items);

  //console.log(invoice.senderAddress.street);

  const [formObject, setFormObject] = useState({
    streetAddress: invoice.senderAddress.street,
    city: invoice.senderAddress.city,
    postCode: invoice.senderAddress.postCode,
    country: invoice.senderAddress.country,
    streetAddressClient: invoice.clientAddress.street,
    cityClient: invoice.clientAddress.city,
    postCodeClient: invoice.clientAddress.postCode,
    countryClient: invoice.clientAddress.country,
    clientEmail: invoice.clientEmail,
    clientName: invoice.clientName,
    invoiceDate: invoice.createdAt,
    paymentTerms: invoice.paymentTerms,
    projectDescription: invoice.description,
    id: invoice.id,
    paymentDue: invoice.paymentDue,
    total: invoice.total,
    status: invoice.status,
    items: itemsArray,
  });

  //console.log(formObject.items);
  //console.log(formObject.items);
  //console.log(itemsArray);

  function handleChange(event) {
    const { name, value } = event.target;
    //console.log(name);
    //console.log(value);
    setFormObject({ ...formObject, [name]: value });
  }

  function handleChangeItem(event) {
    const { name, value } = event.target;
    //console.log(name);
    //console.log(value);
    setItemObject({ ...itemObject, [name]: value });
  }

  const [itemObject, setItemObject] = useState({});

  function handleDeleteEditClick(name) {
    setItemsArray((prevState) => {
      const updatedArray = prevState.filter((item) => item.name !== name);
      //console.log(prevState);
      return updatedArray;
    });
  }

  //console.log(itemsArray);
  //console.log(formObject);

  const newInvoiceObj = {
    clientAddress: {
      city: formObject.cityClient,
      country: formObject.countryClient,
      postCode: formObject.postCodeClient,
      street: formObject.streetAddressClient,
    },
    clientEmail: formObject.clientEmail,
    clientName: formObject.clientName,
    createdAt: formObject.invoiceDate,
    description: formObject.projectDescription,
    id: formObject.id,
    items: itemsArray,
    paymentDue: "12-3-2021",
    senderAddress: {
      city: formObject.city,
      country: formObject.country,
      postCode: formObject.postCode,
      street: formObject.streetAddress,
    },
    status: formObject.status,
    total:
      itemsArray.length > 0
        ? itemsArray.map((obj) => obj.total).reduce((a, b) => a + b)
        : 0,
  };

  function handleSaveClick() {
    // setAllInvoices((prevState) => [...prevState, newInvoiceObj]);
    setAllInvoices((prevState) => {
      const updatedInvoices = prevState.map((obj) => {
        if (obj.id === formObject.id) {
          return newInvoiceObj;
        }
        return obj;
      });
      return updatedInvoices;
    });
    setEditInvoice(false);
  }

  function test() {
    itemObject["total"] = itemObject.quantity * itemObject.price;
    return itemObject.quantity * itemObject.price;
  }

  return (
    <>
      {!editInvoice && (
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
            {invoice.status !== "paid" && (
              <StyledManageInvoiceButton
                backgroundColor="#F9FAFE"
                color="#7E88C3"
                onClick={() => setEditInvoice(true)}
              >
                Edit
              </StyledManageInvoiceButton>
            )}
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
        </>
      )}
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
      {editInvoice && (
        <>
          <StyledCreateNewInvoiceDiv>
            <StyledGoBackLink onClick={() => setEditInvoice(false)}>
              <ArrowLeft /> Go back
            </StyledGoBackLink>
            <button onClick={() => setEditInvoice(false)}>Cancel</button>
            <button onClick={() => console.log(invoice)}>OK</button>
            <h2>New Invoice</h2>
            <StyledPara>Bill from</StyledPara>
            <StyledInputDiv>
              <label htmlFor="streetAddress">Street Address</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formObject.streetAddress}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledInputDoubleDiv>
              <StyledInputDiv>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formObject.city}
                  onChange={handleChange}
                />
              </StyledInputDiv>
              <StyledInputDiv>
                <label htmlFor="postCode">Post Code</label>
                <input
                  type="text"
                  id="postCode"
                  name="postCode"
                  value={formObject.postCode}
                  onChange={handleChange}
                />
              </StyledInputDiv>
            </StyledInputDoubleDiv>
            <StyledInputDiv>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formObject.country}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledPara>Bill To</StyledPara>
            <StyledInputDiv>
              <label htmlFor="clientName">Client's name</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formObject.clientName}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledInputDiv>
              <label htmlFor="clientEmail">Client's Email</label>
              <input
                type="text"
                id="clientEmail"
                name="clientEmail"
                value={formObject.clientEmail}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledInputDiv>
              <label htmlFor="streetAddressClient">Street Address</label>
              <input
                type="text"
                id="streetAddressClient"
                name="streetAddressClient"
                value={formObject.streetAddressClient}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledInputDoubleDiv>
              <StyledInputDiv>
                <label htmlFor="cityClient">City</label>
                <input
                  type="text"
                  id="cityClient"
                  name="cityClient"
                  value={formObject.cityClient}
                  onChange={handleChange}
                />
              </StyledInputDiv>
              <StyledInputDiv>
                <label htmlFor="postCodeClient">Post Code</label>
                <input
                  type="text"
                  id="postCodeClient"
                  name="postCodeClient"
                  value={formObject.postCodeClient}
                  onChange={handleChange}
                />
              </StyledInputDiv>
            </StyledInputDoubleDiv>
            <StyledInputDiv>
              <label htmlFor="countryClient">Country</label>
              <input
                type="text"
                id="countryClient"
                name="countryClient"
                value={formObject.countryClient}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledInputDiv>
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                type="text"
                id="invoiceDate"
                name="invoiceDate"
                value={formObject.invoiceDate}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledInputDiv>
              <label htmlFor="paymentTerms">Payment Terms</label>
              <input
                type="text"
                id="paymentTerms"
                name="paymentTerms"
                value={formObject.paymentTerms}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledInputDiv>
              <label htmlFor="projectDescription">Project Description</label>
              <input
                type="text"
                id="projectDescription"
                name="projectDescription"
                value={formObject.projectDescription}
                onChange={handleChange}
              />
            </StyledInputDiv>
            <StyledItemListTitle>Item List</StyledItemListTitle>
            <div>
              <StyledInputDiv>
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formObject.items.name}
                  onChange={handleChangeItem}
                />
              </StyledInputDiv>
              <StyledItemListGridDiv>
                <StyledInputDiv>
                  <label htmlFor="quantity">Qty.</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formObject.items.quantity}
                    onChange={handleChangeItem}
                  />
                </StyledInputDiv>
                <StyledInputDiv>
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formObject.items.price}
                    onChange={handleChangeItem}
                  />
                </StyledInputDiv>
                <StyledTotalDiv>
                  {/* <label htmlFor="total">Total</label>
          <input
            type="total"
            id="total"
            name="total"
            value={itemObject.quantity * itemObject.price}
            onChange={handleChangeItem}
          /> */}
                  <p>Total</p>
                  <div>
                    {itemObject.quantity && itemObject.price ? test() : null}
                  </div>
                </StyledTotalDiv>
                <div></div>
              </StyledItemListGridDiv>
            </div>
            {itemsArray.length > 0 && (
              <div>
                {itemsArray.map((object, index) => (
                  <div key={index} id={index}>
                    <StyledItemListItemDiv>
                      <p>Item Name</p>
                      <p>{object.name}</p>
                    </StyledItemListItemDiv>
                    <StyledItemListParaGridDiv>
                      <StyledItemListItemDiv>
                        <p>Qty.</p>
                        <p>{object.quantity}</p>
                      </StyledItemListItemDiv>
                      <StyledItemListItemDiv>
                        <p>Price</p>
                        <p>{object.price}</p>
                      </StyledItemListItemDiv>
                      <StyledTotalParaDiv>
                        <p>Total</p>
                        <p>{object.total}</p>
                      </StyledTotalParaDiv>
                      <button
                        onClick={() => handleDeleteEditClick(object.name)}
                      >
                        Trash can icon
                      </button>
                    </StyledItemListParaGridDiv>
                  </div>
                ))}
              </div>
            )}
            <StyledAddItemButton
              onClick={() =>
                setItemsArray((prevState) => [...prevState, itemObject])
              }
            >
              + Add New Item
            </StyledAddItemButton>
          </StyledCreateNewInvoiceDiv>
          <StyledButtonsCreateDiv>
            <StyledCreateInvoiceButton
              backgroundColor="#F9FAFE"
              color="#7E88C3"
              onClick={() => {
                setEditInvoice(false);
                setFormObject({
                  streetAddress: invoice.senderAddress.street,
                  city: invoice.senderAddress.city,
                  postCode: invoice.senderAddress.postCode,
                  country: invoice.senderAddress.country,
                  streetAddressClient: invoice.clientAddress.street,
                  cityClient: invoice.clientAddress.city,
                  postCodeClient: invoice.clientAddress.postCode,
                  countryClient: invoice.clientAddress.country,
                  clientEmail: invoice.clientEmail,
                  clientName: invoice.clientName,
                  invoiceDate: invoice.createdAt,
                  paymentTerms: invoice.paymentTerms,
                  projectDescription: invoice.description,
                  id: invoice.id,
                  paymentDue: invoice.paymentDue,
                  total: invoice.total,
                  status: invoice.total,
                  items: invoice.items,
                });
              }}
            >
              Cancel
            </StyledCreateInvoiceButton>
            <Link to="/" onClick={handleSaveClick}>
              <StyledCreateInvoiceButton
                backgroundColor="#7C5DFA"
                color="#ffffff"
              >
                Save Changes
              </StyledCreateInvoiceButton>
            </Link>
          </StyledButtonsCreateDiv>
        </>
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

/* CANCER DUPLICATION LMAO */

const StyledCreateNewInvoiceDiv = styled.div`
  //background: #fff;
  padding: 32px 0px 0px 0px;
  margin: 0px 24px;

  h2 {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.5px;
    margin: 24px 0px 32px 0px;
  }
`;

const StyledGoBackLink = styled.a`
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

const StyledPara = styled.p`
  font-weight: bold;
  color: #7c5dfa;
  margin-bottom: 24px;
`;

const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 24px;

  label {
    color: #7e88c3;
    margin-bottom: 10px;
  }

  input {
    background: #ffffff;
    border: 1px solid #dfe3fa;
    border-radius: 4px;
    padding: 17px 20px;
    color: #0c0e16;
    font-weight: bold;
    width: 100%;
  }
`;

const StyledInputDoubleDiv = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 23px;
`;

const StyledItemListTitle = styled.h3`
  color: #777f98;
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: -0.375px;
`;

const StyledItemListGridDiv = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1.6fr 1.4fr 1fr;
  grid-gap: 16px;
  //justify-content: center;
  align-items: center;
`;

const StyledTotalDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  p {
    margin-top: 0px;
    margin-bottom: 27px;
    color: #7e88c3;
  }

  div {
    color: #888eb0;
    font-weight: bold;
  }
`;

const StyledItemListItemDiv = styled.div`
  p:nth-child(1) {
    color: #7e88c3;
    margin-bottom: 16px;
  }

  p:nth-child(2) {
    color: #0c0e16;
    font-weight: bold;
    padding: 17px 20px;
    background: #ffffff;
    border: 1px solid #dfe3fa;
    border-radius: 4px;
  }
`;

const StyledItemListParaGridDiv = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1.6fr 1.4fr 1fr;
  grid-gap: 16px;
  //justify-content: center;
  align-items: center;
`;

const StyledTotalParaDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  p:nth-child(1) {
    margin-top: 12px;
    margin-bottom: 27px;
    color: #7e88c3;
  }

  p:nth-child(2) {
    color: #888eb0;
    font-weight: bold;
  }
`;

const StyledAddItemButton = styled.button`
  border: none;
  background: hsl(228, 71%, 96%);
  border-radius: 24px;
  width: 100%;
  padding: 17px 107px;
  font-weight: bold;
  color: #7e88c3;
  margin: 26px 0px 48px 0px;
`;

const StyledButtonsCreateDiv = styled.div`
  background: #fff;
  //padding: 21px 24px;
  padding: 21px 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`;

const StyledCreateInvoiceButton = styled.button`
  border: none;
  background: ${(props) => props.backgroundColor};
  padding: 17px 26px;
  font-family: "Spartan", sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
  line-height: 15px;
  letter-spacing: -0.25px;
  border-radius: 25px;
  margin-right: 16px;

  &:hover {
    cursor: pointer;
  }
`;

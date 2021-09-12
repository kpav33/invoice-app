import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../assets/icon-arrow-left.svg";

export default function NewInvoice({ setCreateNewInvoice, setAllInvoices }) {
  // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  // https://scrimba.com/learn/learnreact/react-forms-part-1-cW8Jdfy

  function uniqueID() {
    let char =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let num = Math.floor(1000 + Math.random() * 9000);
    return char + num;
  }

  uniqueID();

  const [itemObject, setItemObject] = useState({});

  const [itemsArray, setItemsArray] = useState([]);
  //console.log(itemObject);

  const [formObject, setFormObject] = useState({
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
    streetAddressClient: "",
    cityClient: "",
    postCodeClient: "",
    countryClient: "",
    clientEmail: "",
    clientName: "",
    invoiceDate: "",
    paymentTerms: "",
    projectDescription: "",
    id: uniqueID(),
    paymentDue: "12-3-2021",
    total: "1000",
    status: "pending",
    items: itemsArray,
  });

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
    id: uniqueID(),
    items: itemsArray,
    paymentDue: "12-3-2021",
    senderAddress: {
      city: formObject.city,
      country: formObject.country,
      postCode: formObject.postCode,
      street: formObject.streetAddress,
    },
    status: "pending",
    total:
      itemsArray.length > 0
        ? itemsArray.map((obj) => obj.total).reduce((a, b) => a + b)
        : 0,
  };

  //console.log(newInvoiceObj);

  //console.log(itemsArray.map((obj) => obj.total).reduce((a, b) => a + b));
  //console.log(formObject);
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

  //console.log(itemObject);

  function handleSaveClick() {
    setAllInvoices((prevState) => [...prevState, newInvoiceObj]);
    setCreateNewInvoice(false);
  }

  function test() {
    itemObject["total"] = itemObject.quantity * itemObject.price;
    return itemObject.quantity * itemObject.price;
  }

  function handleDraftClick() {
    newInvoiceObj["status"] = "draft";
    setAllInvoices((prevState) => [...prevState, newInvoiceObj]);
    setCreateNewInvoice(false);
  }

  function handleDiscardClick() {
    setCreateNewInvoice(false);
  }

  return (
    <>
      <StyledCreateNewInvoiceDiv>
        <StyledGoBackLink onClick={() => setCreateNewInvoice(false)}>
          <ArrowLeft /> Go back
        </StyledGoBackLink>
        {/* <div>
        <button onClick={() => setCreateNewInvoice(false)}>Go back</button>
      </div> */}
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
            <div>Trash can icon</div>
          </StyledItemListGridDiv>
        </div>
        {itemsArray.length > 0 && (
          <div>
            {itemsArray.map((object, index) => (
              <div key={index}>
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
                  <div>Trash can icon</div>
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
          onClick={handleDiscardClick}
        >
          Discard
        </StyledCreateInvoiceButton>
        <StyledCreateInvoiceButton
          backgroundColor="#373B53"
          color="#888EB0"
          onClick={handleDraftClick}
        >
          Save as Draft
        </StyledCreateInvoiceButton>
        <StyledCreateInvoiceButton
          backgroundColor="#7C5DFA"
          color="#FFFFFF"
          onClick={handleSaveClick}
        >
          Save &amp; Send
        </StyledCreateInvoiceButton>
      </StyledButtonsCreateDiv>
    </>
  );
}

const StyledCreateNewInvoiceDiv = styled.div`
  //background: #fff;

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
  justify-content: space-around;
  align-items: center;
`;

const StyledCreateInvoiceButton = styled.button`
  border: none;
  background: ${(props) => props.backgroundColor};
  padding: 17px 15px;
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

import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { ReactComponent as ArrowLeft } from "../assets/icon-arrow-left.svg";
import { ReactComponent as Delete } from "../assets/icon-delete.svg";
import { ReactComponent as Calendar } from "../assets/icon-calendar.svg";

import "react-datepicker/dist/react-datepicker.css";

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

  // Date picker
  const [startDate, setStartDate] = useState(new Date());

  function handleChangeDatePicker(date) {
    setStartDate(date);
    setFormObject({ ...formObject, invoiceDate: date });
  }

  //console.log(startDate);

  // Payment Terms select
  const optionsTerms = [
    { value: "1", label: "Net 1 Day" },
    { value: "7", label: "Net 7 Days" },
    { value: "14", label: "Net 14 Days" },
    { value: "30", label: "Net 30 Days" },
  ];

  const [paymentTerm, setPaymentTerms] = useState("");

  //console.log(paymentTerm);

  function handleChangePaymentTerms(value) {
    setPaymentTerms(value.value);
    setFormObject({ ...formObject, paymentTerms: value.value });
  }

  let startDateString = new Date(startDate.getTime()).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  //console.log(startDateString + " OK");

  let paymentDue = paymentTerm
    ? 60 * 60 * 24 * 1000 * parseInt(paymentTerm)
    : null;

  let paymentDueString = new Date(
    startDate.getTime() + paymentDue
  ).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  //console.log(paymentDueString);

  //console.log(paymentDue);

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
    paymentDue: "",
    total: "1000",
    status: "pending",
    items: itemsArray,
  });

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
    createdAt: startDateString,
    description: formObject.projectDescription,
    id: uniqueID(),
    items: itemsArray,
    paymentDue: paymentDueString,
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

  function handleDeleteClick(name) {
    setItemsArray((prevState) => {
      const updatedArray = prevState.filter((item) => item.name !== name);
      //console.log(prevState);
      return updatedArray;
    });
  }

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
        <StyledDatepickerDiv>
          {/* <label htmlFor="invoiceDate">Invoice Date</label>
          <input
            type="text"
            id="invoiceDate"
            name="invoiceDate"
            value={formObject.invoiceDate}
            onChange={handleChange}
          /> */}
          <DatePicker
            selected={startDate}
            onChange={(date) => handleChangeDatePicker(date)}
          />
          <Calendar />
        </StyledDatepickerDiv>
        <StyledInputDiv>
          {/* <label htmlFor="paymentTerms">Payment Terms</label>
          <input
            type="text"
            id="paymentTerms"
            name="paymentTerms"
            value={formObject.paymentTerms}
            onChange={handleChange}
          /> */}
          <Select
            //classNamePrefix="list"
            options={optionsTerms}
            styles={colourStyles}
            onChange={handleChangePaymentTerms}
            placeholder="Payment Terms"
            components={{
              IndicatorSeparator: () => null,
            }}
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
                  <StyledDeleteButton
                    onClick={() => handleDeleteClick(object.name)}
                  >
                    <Delete />
                  </StyledDeleteButton>
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

const StyledDatepickerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;

  /* label {
    color: #7e88c3;
    margin-bottom: 10px;
  } */

  input {
    background: #ffffff;
    border: 1px solid #dfe3fa;
    border-radius: 4px;
    padding: 17px 20px;
    color: #0c0e16;
    font-weight: bold;
    width: 100%;
  }

  svg {
    position: absolute;
    top: 35%;
    left: 90%;

    @media only screen and (min-width: 900px) {
      left: 96%;
    }

    path {
      opacity: 1;
    }
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
  padding: 17px 25px;
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
  padding: 17px 12px;
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

const StyledDeleteButton = styled.button`
  background: none;
  border: none;
  margin-top: 40px;

  &:hover {
    cursor: pointer;
  }
`;

const colourStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (styles) => ({
    ...styles,
    width: "100%",
    padding: "10px 8px",
    border: "1px solid #dfe3fa",
    borderRadius: "4px",
    fontFamily: "Spartan, sans-serif",
    background: "white",
    fontWeight: "bold",
    //boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    //marginTop: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
    "@media only screen and (min-width: 768px)": {
      // width: "150px",
      // marginRight: "40px",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#0C0E16",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#7C5DFA",
    "&:hover": {
      color: "#7C5DFA",
    },
  }),
  menu: (base) => ({
    ...base,
    // kill the gap
    marginTop: "15px",
    background: "hsl(0, 0%, 100%)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    width: "100%",
    borderRadius: "8px",
    "@media only screen and (min-width: 768px)": {
      // width: "150px",
    },
  }),
  menuList: (base) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    borderRadius: "5px",
  }),
  option: (styles) => {
    return {
      ...styles,
      padding: "15px 20px 10px 20px",
      borderBottom: "1px solid #DFE3FA",
      fontFamily: "Spartan, sans-serif",
      color: "#0C0E16",
      background: "hsl(0, 0%, 100%)",
      fontWeight: "bold",
      cursor: "pointer",
      "&:hover": {
        color: "#7C5DFA",
      },
    };
  },
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#0C0E16",
    };
  },
  valueContainer: (base) => ({
    ...base,
    //background: "red",
    //color: "white",
    //width: "auto",
    paddingRight: "0px",
    //marginLeft: "15px",
    //zIndex: "10",
  }),
};

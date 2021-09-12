import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../assets/icon-arrow-left.svg";

export default function NewInvoice({ setCreateNewInvoice, setAllInvoices }) {
  // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  // https://scrimba.com/learn/learnreact/react-forms-part-1-cW8Jdfy

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
    id: "1",
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
    id: "RT0000",
    items: itemsArray,
    paymentDue: "12-3-2021",
    senderAddress: {
      city: formObject.city,
      country: formObject.country,
      postCode: formObject.postCode,
      street: formObject.streetAddress,
    },
    status: "draft",
    total: itemsArray.map((obj) => obj.total).reduce((a, b) => a + b),
  };

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
  }

  function test() {
    itemObject["total"] = itemObject.quantity * itemObject.price;
    return itemObject.quantity * itemObject.price;
  }

  return (
    <StyledCreateNewInvoiceDiv>
      <StyledGoBackLink onClick={() => setCreateNewInvoice(false)}>
        <ArrowLeft /> Go back
      </StyledGoBackLink>
      {/* <div>
        <button onClick={() => setCreateNewInvoice(false)}>Go back</button>
      </div> */}
      <h2>New Invoice</h2>
      <p>Bill from</p>
      <div>
        <label htmlFor="streetAddress">Street Address</label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={formObject.streetAddress}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formObject.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="postCode">Post Code</label>
        <input
          type="text"
          id="postCode"
          name="postCode"
          value={formObject.postCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formObject.country}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="clientName">Client's name</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formObject.clientName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="clientEmail">Client's Email</label>
        <input
          type="text"
          id="clientEmail"
          name="clientEmail"
          value={formObject.clientEmail}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="streetAddressClient">Street Address</label>
        <input
          type="text"
          id="streetAddressClient"
          name="streetAddressClient"
          value={formObject.streetAddressClient}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cityClient">City</label>
        <input
          type="text"
          id="cityClient"
          name="cityClient"
          value={formObject.cityClient}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="postCodeClient">Post Code</label>
        <input
          type="text"
          id="postCodeClient"
          name="postCodeClient"
          value={formObject.postCodeClient}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="countryClient">Country</label>
        <input
          type="text"
          id="countryClient"
          name="countryClient"
          value={formObject.countryClient}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="invoiceDate">Invoice Date</label>
        <input
          type="text"
          id="invoiceDate"
          name="invoiceDate"
          value={formObject.invoiceDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="paymentTerms">Payment Terms</label>
        <input
          type="text"
          id="paymentTerms"
          name="paymentTerms"
          value={formObject.paymentTerms}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="projectDescription">Project Description</label>
        <input
          type="text"
          id="projectDescription"
          name="projectDescription"
          value={formObject.projectDescription}
          onChange={handleChange}
        />
      </div>
      <h3>Item List</h3>
      <div>
        <div>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formObject.items.name}
            onChange={handleChangeItem}
          />
        </div>
        <div>
          <label htmlFor="quantity">Qty.</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formObject.items.quantity}
            onChange={handleChangeItem}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formObject.items.price}
            onChange={handleChangeItem}
          />
        </div>
        <div>
          {/* <label htmlFor="total">Total</label>
          <input
            type="total"
            id="total"
            name="total"
            value={itemObject.quantity * itemObject.price}
            onChange={handleChangeItem}
          /> */}
          <p>
            Total: {itemObject.quantity && itemObject.price ? test() : null}
          </p>
        </div>
        <div>Trash can icon</div>
      </div>
      {itemsArray.length > 0 && (
        <div>
          {itemsArray.map((object, index) => (
            <div key={index}>
              <p>{object.name}</p>
              <p>{object.quantity}</p>
              <p>{object.price}</p>
              <p>Total {object.total}</p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setItemsArray((prevState) => [...prevState, itemObject])}
      >
        Add New Item
      </button>
      <br />
      <button onClick={handleSaveClick}>SAVE</button>
    </StyledCreateNewInvoiceDiv>
  );
}

const StyledCreateNewInvoiceDiv = styled.div`
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

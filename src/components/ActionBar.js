import React from "react";
import styled from "styled-components";
import Select from "react-select";

import { ReactComponent as Plus } from "../assets/icon-plus.svg";

export default function ActionBar({
  allInvoices,
  setCreateNewInvoice,
  filter,
  setFilter,
  width,
  handleChangeFilter,
}) {
  // react-select possible options
  const options = [
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Pending" },
    { value: "draft", label: "Draft" },
    { value: "all", label: "All" },
  ];

  return (
    <StyledActionBarDiv>
      <div>
        <h2>Invoices</h2>
        <p style={{ color: "#888EB0" }}>
          {allInvoices.length > 0
            ? `${allInvoices.length} invoices`
            : "No invoices"}
        </p>
      </div>
      <ActionBarSelectionDiv>
        {/* Replaced with react-select
        <select value={filter} onChange={handleChange} name="filter">
          <option value="all">Filter</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
          <option value="all">All</option>
        </select> */}
        <Select
          //classNamePrefix="list"
          options={options}
          styles={colourStyles}
          onChange={handleChangeFilter}
          placeholder={width > 900 ? "Filter by status" : "Filter"}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
        <PlusIconDiv>
          <Plus />
        </PlusIconDiv>
        <button onClick={() => setCreateNewInvoice(true)}>
          {width < 450 ? "New" : "New invoice"}
        </button>
      </ActionBarSelectionDiv>
    </StyledActionBarDiv>
  );
}

const StyledActionBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;

  h2 {
    margin: 0;
    margin-bottom: 4px;

    @media only screen and (min-width: 900px) {
      font-size: 32px;
      margin-bottom: 8px;
      line-height: 36px;
      letter-spacing: -1px;
    }
  }

  p {
    margin: 0;
  }
`;

const ActionBarSelectionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  button {
    margin-left: 6px;
    border: none;
    background: var(--button-purple-new);
    color: white;
    padding: 15px 14px 15px 46px;
    border-radius: 25px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.25px;
    line-height: 15px;

    @media only screen and (min-width: 900px) {
      padding: 15px 14px 15px 56px;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

const PlusIconDiv = styled.div`
  //padding: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: 55%;

  @media only screen and (min-width: 900px) {
    left: 60%;
  }
`;

const colourStyles = {
  control: (styles) => ({
    ...styles,
    width: "90px",
    //padding: "0.4rem",
    //borderRadius: "5px",
    border: "none",
    fontFamily: "Spartan, sans-serif",
    background: "none",
    fontWeight: "bold",
    //boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    //marginTop: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
    "@media only screen and (min-width: 768px)": {
      width: "150px",
      marginRight: "40px",
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
    marginTop: "5px",
    background: "hsl(0, 0%, 100%)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    width: "90px",
    "@media only screen and (min-width: 768px)": {
      width: "150px",
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
      fontFamily: "Spartan, sans-serif",
      color: "#0C0E16",
      background: "hsl(0, 0%, 100%)",
      fontWeight: "bold",
      cursor: "pointer",
      "&:hover": {
        background: "hsl(0, 0%, 94%)",
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

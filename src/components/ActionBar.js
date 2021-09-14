import React from "react";
import styled from "styled-components";

import { ReactComponent as Plus } from "../assets/icon-plus.svg";

export default function ActionBar({
  allInvoices,
  setCreateNewInvoice,
  filter,
  setFilter,
  handleChange,
  width,
}) {
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
        <select value={filter} onChange={handleChange} name="filter">
          <option value="all">Filter</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
          <option value="all">All</option>
        </select>
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
    margin-left: 18px;
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
    left: 42%;
  }
`;

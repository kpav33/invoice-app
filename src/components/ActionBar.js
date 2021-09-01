import React from "react";
import styled from "styled-components";

import { ReactComponent as Plus } from "../assets/icon-plus.svg";

export default function ActionBar() {
  return (
    <StyledActionBarDiv>
      <div>
        <h2>Invoices</h2>
        <p>7 invoices</p>
      </div>
      <ActionBarSelectionDiv>
        <div>Filter</div>
        <PlusIconDiv>
          <Plus />
        </PlusIconDiv>
        <button>New</button>
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
  left: 40%;
`;

import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/icon-arrow-left.svg";

export default function ViewInvoice() {
  let { state } = useLocation();
  console.log(state);

  let statusCapitalized = state.status[0].toUpperCase() + state.status.slice(1);

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

  return (
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
        <p>
          <span>#</span>
          {state.id}
        </p>
        <div>address</div>
        <div>
          <div>title</div>
          <div>title</div>
        </div>
        <div>title</div>
        <div>title</div>
      </StyledInvoiceInfoDiv>
    </StyledViewInvoiceDiv>
  );
}

const StyledViewInvoiceDiv = styled.div`
  padding: 32px 24px 0px 24px;
`;

const StyledBackLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;

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
`;

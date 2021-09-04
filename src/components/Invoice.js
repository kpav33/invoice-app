import React from "react";
import styled from "styled-components";

export default function Invoice({ id, due, name, total, status }) {
  return (
    <StyledInvoiceDiv>
      <StyledIdPara>
        <span>#</span>
        {id}
      </StyledIdPara>
      <StyledDatePara>
        <span>Due</span> {due}
      </StyledDatePara>
      <StyledNamePara>{name}</StyledNamePara>
      <StyledValuePara>€{total}</StyledValuePara>
      <StyledStatusDiv>
        <span className="dot"></span>
        {status}
      </StyledStatusDiv>
    </StyledInvoiceDiv>
  );
}

const StyledInvoiceDiv = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 7px;
  display: grid;
  grid-template-rows: 1.5fr 1fr 1fr;
  //grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  grid-template-areas:
    "id name"
    "date status"
    "value status";

  p {
    //padding: 0;
    margin: 0;
  }
`;

const StyledIdPara = styled.p`
  font-weight: bold;
  color: var(--text-light-black);
  grid-area: id;

  span {
    color: var(--text-light-form);
  }
`;

const StyledDatePara = styled.p`
  color: var(--text-light-form);
  grid-area: date;

  span {
    color: var(--date-text-light);
  }
`;

const StyledNamePara = styled.p`
  color: #858bb2;
  grid-area: name;
  //align-self: flex-end;
`;

const StyledValuePara = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  letter-spacing: -0.8px;
  color: var(--text-light-black);
  grid-area: value;
`;

const StyledStatusDiv = styled.div`
  color: #33d69f;
  font-weight: bold;
  background: rgba(51, 214, 159, 0.06);
  border-radius: 6px;
  width: 104px;
  padding: 13px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: status;

  .dot {
    height: 8px;
    width: 8px;
    background-color: #33d69f;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
  }
`;

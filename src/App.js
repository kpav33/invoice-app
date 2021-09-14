import React, { useState } from "react";
import { GlobalStyles } from "./GlobalStyle.style";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import data from "./data.json";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import ViewInvoice from "./components/ViewInvoice";

//console.log(data[0]);

export default function App() {
  const [allInvoices, setAllInvoices] = useState(data);

  return (
    <StyledAppDiv>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <MainContent
            allInvoices={allInvoices}
            setAllInvoices={setAllInvoices}
          />
        </Route>
        <Route path="/invoice/:invoiceId">
          <ViewInvoice
            allInvoices={allInvoices}
            setAllInvoices={setAllInvoices}
          />
        </Route>
      </Switch>
    </StyledAppDiv>
  );
}

const StyledAppDiv = styled.div`
  //background-color: gray;
  //opacity: 0.5;
  //background-color: rgba(0, 0, 255, 0.3);
  //z-index: 100;

  @media only screen and (min-width: 900px) {
    display: flex;
    flex-direction: row;
  }
`;

//export default App;

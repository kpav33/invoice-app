import React, { useState } from "react";
import { GlobalStyles } from "./GlobalStyle.style";
import { Switch, Route } from "react-router-dom";
import data from "./data.json";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import ViewInvoice from "./components/ViewInvoice";

//console.log(data);

export default function App() {
  const [allInvoices, setAllInvoices] = useState(data);

  return (
    <div className="App">
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
    </div>
  );
}

//export default App;

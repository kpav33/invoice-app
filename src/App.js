import { GlobalStyles } from "./GlobalStyle.style";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import ViewInvoice from "./components/ViewInvoice";

export default function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <MainContent />
        </Route>
        <Route path="/invoice/:invoiceId">
          <ViewInvoice />
        </Route>
      </Switch>
    </div>
  );
}

//export default App;

import { GlobalStyles } from "./GlobalStyle.style";

import Header from "./components/Header";
import MainContent from "./components/MainContent";

export default function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <MainContent />
    </div>
  );
}

//export default App;

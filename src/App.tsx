import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import GlobalStyle from "./styles/global";
import { FoodsProvider } from "./hooks/useFood";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <FoodsProvider>
          <Routes />
        </FoodsProvider>
      </Router>
    </>
  );
};

export default App;

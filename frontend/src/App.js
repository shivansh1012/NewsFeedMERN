import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

// import HomePage from "./NewsComponents/HomePage.jsx";
// import NewsBody from "./NewsComponents/NewsBody.jsx";
import NewsRouter from "./NewsComponents/NewsRouter.js";
import AuthorRouter from "./AuthorComponents/AuthorRouter.js";
import { AuthorAuthContextProvider } from "./AuthorComponents/AuthorAuthContext.js";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={HomePage} />

        <Route exact path="/news/:id" component={NewsBody} /> */}

        <Route path="/news/">
          <NewsRouter/>
        </Route>

        <Route path="/author">
          <AuthorAuthContextProvider>
            <AuthorRouter />
          </AuthorAuthContextProvider>
        </Route>

        <Route render={() => <Redirect to={{ pathname: "/news" }} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

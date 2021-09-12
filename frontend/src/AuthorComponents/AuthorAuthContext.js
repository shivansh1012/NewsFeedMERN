import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiBaseURL } from "../Config.js";

const AuthorAuthContext = createContext();

function AuthorAuthContextProvider(props) {
  const [authorLoggedIn, setAuthorLoggedIn] = useState(undefined);
  const [authorName, setAuthorName] = useState(undefined);
  const [authorEmail, setAuthorEmail] = useState(undefined);

  async function getAuthorLoggedIn() {
    const loggedInRes = await axios.get(`${apiBaseURL}/author/loggedIn`);
    
    setAuthorLoggedIn(loggedInRes.data.authorized);
    setAuthorName(loggedInRes.data.name);
    setAuthorEmail(loggedInRes.data.email);
  }

  useEffect(() => {
    getAuthorLoggedIn();
  }, []);

  return (
    <AuthorAuthContext.Provider value={{ authorLoggedIn, authorName, authorEmail, getAuthorLoggedIn }}>
      {props.children}
    </AuthorAuthContext.Provider>
  );
}

export default AuthorAuthContext;
export { AuthorAuthContextProvider };
//Modules
import React, { useContext } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import AuthorAuthContext from "./AuthorAuthContext.js";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import NewsUpload from "./Views/NewsUpload/NewsUpload.jsx";
import NavBar from "./Layout/NavBar.js";

export default function AuthorRouter() {
    const { authorLoggedIn } = useContext(AuthorAuthContext);
    const { path } = useRouteMatch();
    return (
        <>
            <NavBar/>
            {authorLoggedIn === true && (
                <>
                    <Route exact path={`${path}`}>
                        <NewsUpload />
                    </Route>
                </>
            )}
            {authorLoggedIn === false && (
                <>
                    <Route exact path={`${path}`}>
                        <Login />
                    </Route>
                    <Route exact path={`${path}/register`}>
                        <Register />
                    </Route>
                </>
            )}
        </>
    )
}

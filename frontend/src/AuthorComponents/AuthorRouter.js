//Modules
import React, { useContext } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import AuthorAuthContext from "./AuthorAuthContext.js";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import NewsUpload from "./Views/NewsUpload/NewsUpload.jsx";
import NewsUpdate from "./Views/NewsUpdate/NewsUpdate.jsx";
import NewsList from "./Views/NewsList/NewsList.jsx";
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
                        <NewsList />
                    </Route>
                    <Route exact path={`${path}/newnews`}>
                        <NewsUpload />
                    </Route>
                    <Route exact path={`${path}/news/update/:id`} component={NewsUpdate}/>
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

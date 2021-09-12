//Modules
import React, { useContext } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import NavBar from "./Layout/NavBar.js";
import HomePage from "./HomePage.jsx";
import NewsBody from "./NewsBody.jsx";

export default function AuthorRouter() {
    const { path } = useRouteMatch();
    console.log(path)
    return (
        <>
            <NavBar/>
            <Route exact path={`${path}`} component={HomePage}/>
            <Route exact path={`${path}:id`} component={NewsBody}/>
        </>
    )
}

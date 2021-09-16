//Modules
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseURL } from "../../Config.js";

import AuthorAuthContext from "../AuthorAuthContext.js";

export default function NavBar() {
    const { authorLoggedIn, getAuthorLoggedIn } = useContext(AuthorAuthContext);
    // const { path } = useRouteMatch();

    async function handleLogout() {
        await axios.get(`${apiBaseURL}/author/logout`);
        await getAuthorLoggedIn();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NewsFeed</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#links">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="links">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/">NewsFeed</Link>
                        {authorLoggedIn === false && (
                            <>
                                <Link className="nav-link" to="/author">AuthorLogin</Link>
                                <Link className="nav-link" to="/author/register">AuthorSignIn</Link>
                            </>
                        )}
                        {authorLoggedIn === true && (
                            <>
                                <Link className="nav-link" to="/author">Home</Link>
                                <Link className="nav-link" to="/author/newnews">New News</Link>
                                <Link className="nav-link" onClick={handleLogout} to="/author">Logout</Link>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    )
}

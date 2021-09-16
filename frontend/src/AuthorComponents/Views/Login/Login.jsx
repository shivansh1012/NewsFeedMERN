import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';
import { apiBaseURL } from "../../../Config.js";
import AuthorAuthContext from "../../AuthorAuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getAuthorLoggedIn } = useContext(AuthorAuthContext);
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = {
            email,
            password
        }
        await axios.post(`${apiBaseURL}/author/login`, loginData, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async (res) => {
                await getAuthorLoggedIn();
                history.push("/author");
            })
            .catch((err) => {
                console.error(err);
                alert("Error")
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="login-form bg-light mt-4 p-4">
                        <form className="row g-3" onSubmit={handleLogin}>
                            <div className="col-12">
                                <label>Email</label>
                                <input type="text" name="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe"> Remember me</label>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-dark float-end">Login</button>
                            </div>
                        </form>
                        <hr className="mt-4" />
                        <div className="col-12">
                            <p className="text-center mb-0"><Link to="/author/register">Signup?</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
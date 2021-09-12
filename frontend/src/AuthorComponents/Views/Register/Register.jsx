import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { apiBaseURL } from "../../../Config.js";
import AuthorAuthContext from "../../AuthorAuthContext";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getAuthorLoggedIn } = useContext(AuthorAuthContext);
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        const registerData = {
            name,
            email,
            password
        }
        axios.post(`${apiBaseURL}/author/register`, registerData, {
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
                        <form className="row g-3" onSubmit={handleRegister}>
                            <div className="col-12">
                                <label>Name</label>
                                <input type="text" name="name" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <label>Email</label>
                                <input type="text" name="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-dark float-end">Sign-Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
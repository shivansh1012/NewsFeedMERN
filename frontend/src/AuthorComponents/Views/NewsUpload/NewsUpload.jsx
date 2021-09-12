import React, { useState } from "react";
import axios from 'axios';
import { apiBaseURL } from "../../../Config.js";

export default function NewsUpload() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newNewsData = {
            title,
            category,
            tags,
            body
        }
        axios.post(`${apiBaseURL}/author/news`, newNewsData, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async (res) => {
                alert(res.data.message);
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
                    <div className="news-form bg-light mt-4 p-4">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label>Title</label>
                                <input type="text" name="title" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <label>Tags</label>
                                <input type="text" name="tags" className="form-control" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <label>Category</label>
                                <input type="text" name="category" className="form-control" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <label>Body</label>
                                <textarea type="text" name="body" className="form-control" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-dark float-end">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState , useCallback} from "react";
import {useHistory } from "react-router-dom";
import axios from "axios";
import { apiBaseURL } from "../../../Config.js";

export default function NewsUpdate(props) {
    const [id, setID] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");

    let history = useHistory();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const newNewsData = {
            _id:id,
            title,
            category,
            tags,
            body
        }
        axios.patch(`${apiBaseURL}/author/news`, newNewsData, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async (res) => {
                alert(res.data.message);
                history.push("/author");
            })
            .catch((err) => {
                console.error(err);
                alert("Error")
            });
    };

    const getNews = useCallback(async () => {
        await axios.get(`${apiBaseURL}/news/news?id=${props.match.params.id}`).then((res) => {
            setID(res.data.newsList._id)
            setTitle(res.data.newsList.title);
            setCategory(res.data.newsList.category);
            setTags(res.data.newsList.tags[0]);
            setBody(res.data.newsList.body);
        });
    }, [props.match.params.id]);

    useEffect(() => {
        getNews();
    }, [getNews]);

    return (
        <div className="container">
            <div className="row">
                <div>
                    <div className="news-form bg-light mt-4 p-4">
                        <form className="row g-3" onSubmit={handleUpdate}>
                        <div className="col-12">
                                <label>Title</label>
                                <input type="text" name="title" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <label>Tags</label>
                                <input type="text" name="tags" className="form-control" placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                            </div>
                            <div className="form-floating">
                                <select className="form-select" id="floatingSelect" value={category} onChange={(e) => setCategory(e.target.value)} >
                                    <option value="politics">Politics</option>
                                    <option value="technology">Technology</option>
                                    <option value="business">Business</option>
                                    <option value="science">Science</option>
                                    <option value="internet">Internet</option>
                                    <option value="World">World</option>
                                </select>
                                <label htmlFor="floatingSelect">Category</label>
                            </div>
                            <div className="col-12">
                                <label>Body</label>
                                <textarea type="text" name="body" className="form-control" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} style={{height:"40vh"}}/>
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
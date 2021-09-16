import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseURL } from "../Config.js";

export default function HomePage() {
    const [category, setCategory] = useState("all");
    const [news, setNews] = useState([]);

    const handleFilter = async (e) => {
        setCategory(e.target.value)
        const response = await axios.get(`${apiBaseURL}/news/news?filter=${e.target.value}`);
        setNews(response.data.newsList)
    }

    const getNewsList = async () => {
        const response = await axios.get(`${apiBaseURL}/news/news`);
        setNews(response.data.newsList)
        // console.log(response.data.newsList)
    }

    useEffect(() => {
        getNewsList();
    }, []);

    return (
        <>
            <div className="container p-4">
                <h3>Filter</h3>
                <div className="form-floating">
                    <select className="form-select" id="floatingSelect" value={category} onChange={handleFilter} >
                        <option value="all">All</option>
                        <option value="politics">Politics</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="science">Science</option>
                        <option value="internet">Internet</option>
                        <option value="World">World</option>
                    </select>
                    <label htmlFor="floatingSelect">Category</label>
                </div>
            </div>
            {
                news.slice(0).reverse().map((currElement) => {
                    return (
                        <div className="container p-3" key={currElement._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title m-3">{currElement.title}</h4>
                                    <p className="card-text">{currElement.body.substring(0, 200)} ...<Link to={`/news/${currElement._id}`}>Read More</Link></p>

                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseURL } from "../Config.js";

export default function HomePage() {
    const [news, setNews] = useState([]);

    const getNewsList = async () => {
        const response = await axios.get(`${apiBaseURL}/news/news`);
        setNews(response.data.newsList)
    }

    useEffect(() => {
        getNewsList();
    }, []);

    return (
        <>
            {
                news.map((currElement) => {
                    return (
                        <div className="container m-3" key={currElement._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title m-3">{currElement.title}</h4>
                                    <p className="card-text">{currElement.body.substring(0,200)} ...<Link to={`/news/${currElement._id}`}>Read More</Link></p>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseURL } from "../Config.js";

export default function CompleteNews(props) {
    const [newsDetail, setNewsDetail] = useState([]);
    console.log(props)
    const getNews = async () => {
        await axios.get(`${apiBaseURL}/news/news?id=${props.match.params.id}`).then((res) => {
            setNewsDetail(res.data.newsList)
        });
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="container m-3">
            <div className="row">
                <h3>{newsDetail.title}</h3>
                <div className="column">
                    <h6>Author : {newsDetail.author}</h6>
                    <h6>Category: {newsDetail.category}</h6>
                </div>
                <p>{newsDetail.body}</p>
            </div>
        </div>
    )
}

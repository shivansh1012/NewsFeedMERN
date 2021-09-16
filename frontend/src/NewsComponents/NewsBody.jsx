import React, { useEffect, useState , useCallback} from "react";
import axios from "axios";
import { apiBaseURL } from "../Config.js";
import {Link} from "react-router-dom";

export default function CompleteNews(props) {
    const [newsDetail, setNewsDetail] = useState([]);

    const getNews = useCallback(async () => {
        await axios.get(`${apiBaseURL}/news/news?id=${props.match.params.id}`).then((res) => {
            setNewsDetail(res.data.newsList)
            // console.log(res)
        });
    }, [props.match.params.id]);

    useEffect(() => {
        getNews();
    }, [getNews]);

    return (
        <div className="container p-4">
            <div className="row">
                <Link style={{textAlign:"center"}} to="/news">{"<"}Back</Link>
                <h3 style={{textAlign:"center"}}>{newsDetail.title}</h3>
                <div className="column" style={{textAlign:"center"}}>
                    <h6>Author : {newsDetail.author}</h6>
                    <h6>Category: {newsDetail.category}</h6>
                </div>
                <p>{newsDetail.body}</p>
            </div>
        </div>
    )
}

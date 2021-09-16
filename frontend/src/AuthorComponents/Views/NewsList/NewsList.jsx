import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { apiBaseURL } from '../../../Config';

export default function NewsList() {
    const [newsList, setNewsList] = useState([]);

    const getNewsList = async () => {
        const response = await axios.get(`${apiBaseURL}/author/news`);
        setNewsList(response.data.newsList);
    }

    useEffect(() => {
        getNewsList();
    }, [])

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category</th>
                        <th scope="col">Title</th>
                        <th scope="col">Views</th>
                        <th scope="col">View</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        newsList.map((news, index) => {
                            return (
                                <tr key={news._id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{news.category}</td>
                                    <td>{news.title}</td>
                                    <td>{news.views}</td>
                                    <td><Link to={`/news/${news._id}`}>View</Link></td>
                                    <td><Link to={`/author/news/update/${news._id}`}>Update</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

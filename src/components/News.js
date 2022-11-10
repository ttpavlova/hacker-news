import React from "react";
import { useState, useEffect } from "react";
import Story from "./Story";

function News() {

    const [stories, setStories] = useState([]);

    const listStories = stories.map((story) => (
        <Story
            id={story}
            key={story}
        />
    ));

    function getLatestNews() {
        fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
            .then(response => response.json())
            .then(result => setStories(result.slice(0,10)));
    }

    useEffect(() => {
        getLatestNews();
    }, []);

    if (!stories) {
        return <div></div>;
    }

    return (
        <div>{listStories}</div>
    );
}

export default News;
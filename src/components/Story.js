import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Story(props) {

    const [story, setStory] = useState("");

    function getStory() {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`)
            .then(response => response.json())
            .then(result => setStory(result));
    }

    // convert unix timestamp to date
    function convertToDate(time) {
        let unix_timestamp = time;
        let fullDate = new Date(unix_timestamp * 1000);
        let date = fullDate.getDate();
        let month = fullDate.getMonth() + 1;
        let year = fullDate.getFullYear();
        
        return date + "." + month + "." + year;
    }

    useEffect(() => {
        getStory();
    }, []);

    return(
        <div>
            <div>{props.id}</div>
            <Link to={`/news/${props.id}`}>{story.title}</Link>
            <div>{story.score}</div>
            <div>{story.by}</div>
            <div>{convertToDate(story.time)}</div>
            <br></br>
        </div>
    );
}

export default Story;
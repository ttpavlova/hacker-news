import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

// convert unix timestamp to date
function convertToDate(time) {
    let unix_timestamp = time;
    let fullDate = new Date(unix_timestamp * 1000);
    let date = fullDate.getDate();
    let month = fullDate.getMonth() + 1;
    let year = fullDate.getFullYear();
    
    return date + "." + month + "." + year;
}

function Story(props) {

    // const story = useSelector(state => getStoryById(state, props.id));
    const story = useSelector(state => state.stories.stories.find(story => story.id === Number(props.id)));

    return(
        <div>
            <div>{props.id}</div>
            <Link to={`/news/${props.id}`}>{story.title}</Link>
            <div>{story.score}</div>
            <div>{story.by}</div>
            <div>{story.kids ? "[" + story.kids.join(', ') + "]" : "no comments"}</div>
            <div>{convertToDate(story.time)}</div>
            <br></br>
        </div>
    );
}

export default Story;
export { convertToDate };
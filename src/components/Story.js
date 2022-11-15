import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Card } from 'antd';

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

    const story = useSelector(state => state.stories.stories.find(story => story.id === Number(props.id)));

    return (
        <>
            <Card
                size="small"
                title={<Link to={`/news/${props.id}`}>{story.title}</Link>}
            >
                <p>{story.score} {story.score === 1 ? "point" : "points"}</p>
                <p>by {story.by}</p>
                <p>{convertToDate(story.time)}</p>
            </Card>
        </>
    );
}

export default Story;
export { convertToDate };
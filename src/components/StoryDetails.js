import React from "react";
import { Divider } from 'antd';

// convert unix timestamp to date
function convertToDate(time) {
    let unix_timestamp = time;
    let fullDate = new Date(unix_timestamp * 1000);
    let date = fullDate.getDate();
    let month = fullDate.getMonth() + 1;
    let year = fullDate.getFullYear();
    
    return date + "." + month + "." + year;
}

function StoryDetails(props) {
    return (
        <>
            <span>{props.score} {props.score === 1 ? "point" : "points"}</span>
            <Divider type="vertical" />
            <span>by {props.by}</span>
            <Divider type="vertical" />
            <span>{convertToDate(props.time)}</span>
        </>
    );
}

export default StoryDetails;
export { convertToDate };
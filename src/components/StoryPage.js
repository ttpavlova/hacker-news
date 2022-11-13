import React from "react";
import Comments from "./Comments";
import Story from "./Story";

function StoryPage({ id }) {

    return (
        <div>
            <h3>Requested topic ID: {id}</h3>
            <Story id={id} />
            <Comments id={id} />
        </div>
    );
}

export default StoryPage;
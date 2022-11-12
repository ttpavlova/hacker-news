import React from "react";
import Story from "./Story";

function StoryPage({ id }) {

    return (
        <div>
            <h3>Requested topic ID: {id}</h3>
            <Story id={id} />
        </div>
    );
}

export default StoryPage;
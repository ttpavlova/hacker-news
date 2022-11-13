import React from "react";
import { withRouter } from 'react-router-dom';
import Comments from "./Comments";
import Story from "./Story";

function StoryPage(props) {

    const id = props.id;

    function backToNews() {
        props.history.goBack();
    }

    return (
        <div>
            <h3>Requested topic ID: {id}</h3>
            <button onClick={() => backToNews()}>Back to news</button>
            <Story id={id} />
            <Comments id={id} />
        </div>
    );
}

export default withRouter(StoryPage);
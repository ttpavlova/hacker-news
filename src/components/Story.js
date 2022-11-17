import React from "react";
import { useSelector } from 'react-redux';
import StoryDetails from "./StoryDetails";

function Story(props) {

    const story = useSelector(state => state.stories.stories.find(story => story.id === Number(props.id)));

    return (
        <div>
            <h1>{story.title} <a href={story.url} target="_blank" rel="noreferrer">(source)</a></h1>
            <StoryDetails
                id={story.id}
                score={story.score}
                by={story.by}
                time={story.time}
            />
        </div>
    );
}

export default Story;
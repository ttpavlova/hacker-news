import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Card } from 'antd';
import StoryDetails from "./StoryDetails";

function StoryCard(props) {

    const story = useSelector(state => state.stories.stories.find(story => story.id === Number(props.id)));

    return (
        <>
            <Card
                size="small"
                title={<Link to={`/news/${props.id}`}>{story.title}</Link>}
            >
                <StoryDetails
                    id={story.id}
                    score={story.score}
                    by={story.by}
                    time={story.time}
                />
            </Card>
        </>
    );
}

export default StoryCard;

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getStoriesAction } from "../store/storiesReducer";
import Story from "./Story";

function News() {

    const dispatch = useDispatch();
    const stories = useSelector(state => state.stories.stories);

    const listStories = stories.map((story) => (
        <Story
            id={story}
            key={story}
        />
    ));

    function getLatestNews() {
        return function(dispatch) {
            fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
            .then(response => response.json())
            .then(result => dispatch(getStoriesAction(result.slice(0,10))))
            .catch(err => alert("Error while loading the data"));
        }
    }

    useEffect(() => {
        dispatch(getLatestNews());
    }, []);

    if (!stories) {
        return <div></div>;
    }

    return (
        <div>{listStories}</div>
    );
}

export default News;
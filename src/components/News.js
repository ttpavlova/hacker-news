import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getStoriesIdAction } from "../store/storiesIdReducer";
import { addStoriesAction, getAllStories } from "../store/storiesReducer";
import Story from "./Story";

function News() {

    const dispatch = useDispatch();
    const storiesId = useSelector(state => state.storiesId.storiesId);
    const stories = useSelector(getAllStories);

    const listStories = stories.map((story) => (
        <Story
            id={story.id}
            key={story.id}
        />
    ));

    function getLatestNews() {
        return function(dispatch) {
            fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
                .then(response => response.json())
                .then(result => result.slice(0,100)) // select the 100 latest stories
                .then(result => {
                    dispatch(getStoriesIdAction(result)); // store an array of IDs
                    return Promise.all(result.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)));
                })
                .then(responses => Promise.all(responses.map(response => response.json())))
                .then(stories => {
                    dispatch(addStoriesAction(stories)); // store an array of stories as objects
                    // console.log(stories);
                })
                .catch(err => alert("Error while loading the data"));
        }
    }

    function refreshNews() {
        dispatch(getLatestNews());
    }

    useEffect(() => {
        refreshNews(); // load a list of news when component is rendered

        const interval = setInterval(() => {
            refreshNews(); // update the list every minute
        }, 60000);

        return () => clearInterval(interval); // represents the unmount function
    }, []);

    if (!storiesId) {
        return <div></div>;
    }

    return (
        <>
            <button onClick={() => refreshNews()}>Refresh news</button>
            <div>{listStories}</div>
        </>
    );
}

export default News;
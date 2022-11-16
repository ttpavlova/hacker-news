import { getStoriesIdAction } from "../store/storiesIdReducer";
import { addStoriesAction } from "../store/storiesReducer";

// fetch an array of IDs of the latest stories
function fetchLatestNews() {
    return function(dispatch) {
        fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
            .then(response => response.json())
            .then(result => result.slice(0,100)) // select the 100 latest stories
            .then(result => {
                dispatch(getStoriesIdAction(result)); // store an array of IDs

                // fetch stories by their IDs
                return Promise.all(result.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)));
            })
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(stories => {
                dispatch(addStoriesAction(stories)); // store an array of stories as objects
            })
            .catch(err => alert("Error while loading the data"));
    }
}

function fetchComments(commentIDs) {
    return Promise.all(commentIDs.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(result => {
            // don't show deleted comments
            const array = result.filter(comments => (!comments.dead && !comments.deleted));

            return array;
        })
        .catch(err => alert("Error while loading the data"));
}

function fetchStory(id) {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(response => response.json())
        .catch(err => alert("Error while loading the data"));
}

export { fetchLatestNews, fetchComments, fetchStory };
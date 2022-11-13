import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Comment from "./Comment";

function Comments(props) {

    const story = useSelector(state => state.stories.stories.find(story => story.id === Number(props.id)));

    const [comments, setComments] = useState([]);

    const listComments = comments.map((comment) => (
        <Comment
            comment={comment}
            key={comment.id}
        />
    ));

    // load all comments
    function getCommentsArray(arrayOfIds) {
        if (arrayOfIds) {
            Promise.all(arrayOfIds.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(result => {
                setComments(result);
                // console.log(result);
            })
            .catch(err => alert("Error while loading the data"));
        }
    }

    useEffect(() => {
        getCommentsArray(story.kids);
    }, []);

    return (
        <div>
            <div>Comments for id: {props.id}</div>
            <div>Comments: {story.kids ? story.kids.length : 0}</div>
            {listComments}
        </div>
    );
}

export default Comments;
import React from "react";
import { useState, useEffect } from "react";
import { convertToDate } from './Story';
import { useDispatch } from 'react-redux';
import { increaseCommentCount } from "../store/commentCountReducer";

function Comment(props) {

    const comment = props.comment;

    const dispatch = useDispatch();

    const [commentKids, setCommentKids] = useState([]);
    const [childCommentsHidden, setChildCommentsHidden] = useState(true);

    const nestedComments = (commentKids || []).map((comment) => (
        <Comment
            comment={comment}
            childCommentsHidden={childCommentsHidden}
            key={comment.id}
        />
    ));

    function showChildComments() {
        const arrayOfKidsIds = comment.kids;

        // if this comment has replies
        if (comment.kids) {
            Promise.all(arrayOfKidsIds.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)))
                .then(responses => Promise.all(responses.map(response => response.json())))
                .then(result => {
                    // don't show deleted comments
                    const array = result.filter(comments => (!comments.dead && !comments.deleted));
                    // add an array of objects to component's state
                    setCommentKids(array);

                    // pass the length of an array excluding deleted comments
                    if (array.length > 0) {
                        dispatch(increaseCommentCount(array.length));
                    }
                })
                .catch(err => alert("Error while loading the data"));
        }
    }

    function displayChildComments() {
        setChildCommentsHidden(false);
    }

    useEffect(() => {
        showChildComments();
    }, [comment]);

    return (
        <div className={"comment" + (props.childCommentsHidden ? " hidden" : "")}>
            <div>id: {comment.id}</div>
            <div>by: {comment.by}</div>
            <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
            <div>time: {convertToDate(comment.time)}</div>
            {commentKids.length > 0 && (
                <button onClick={() => displayChildComments()}>Show replies</button>
            )}
            {nestedComments}
            <br></br>
        </div>
    );
}

export default Comment;
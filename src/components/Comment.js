import React from "react";
import { useState } from "react";
import { convertToDate } from './Story';

function Comment(props) {

    const comment = props.comment;

    const [commentKids, setCommentKids] = useState([]);

    const nestedComments = (commentKids || []).map((comment) => (
        <Comment
            comment={comment}
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
                    // add an array of objects to component's state
                    setCommentKids(result);
                })
                .catch(err => alert("Error while loading the data"));
        }
    }

    return (
        <div className="comment">
            <div>by: {comment.by}</div>
            <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
            <div>time: {convertToDate(comment.time)}</div>
            {comment.kids?.length > 0 && (
                <button onClick={() => showChildComments()}>Show replies</button>
            )}
            {nestedComments}
            <br></br>
        </div>
    );
}

export default Comment;
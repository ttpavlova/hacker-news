import React from "react";
import { useState, useEffect } from "react";
import { convertToDate } from './Story';
import { useDispatch } from 'react-redux';
import { increaseCommentCount } from "../store/commentCountReducer";
import { Button, Comment as CommentTag } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

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

    const actions = [
        // display child comments
        childCommentsHidden === true && (
            <Button onClick={() => setChildCommentsHidden(false)} icon={<CaretDownOutlined />}>Show replies</Button>
        ),
        // hide child comments
        childCommentsHidden === false && (
            <Button onClick={() => setChildCommentsHidden(true)} icon={<CaretUpOutlined />}>Hide replies</Button>
        )
    ];

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

    useEffect(() => {
        showChildComments();
    }, [comment]);

    return (
        <CommentTag
            className={props.childCommentsHidden ? "hidden" : ""}
            actions={commentKids.length > 0 && actions}
            author={comment.by}
            content={
                <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
            }
            datetime={convertToDate(comment.time)}
        >
            {nestedComments}
        </CommentTag>
        
    );
}

export default Comment;
import React from "react";
import { useState, useEffect } from "react";
import { convertToDate } from './Story';
import { useDispatch } from 'react-redux';
import { increaseCommentCount } from "../store/commentCountReducer";
import { fetchComments } from '../async/async';
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

    function showChildComments(childCommentIDs) {
        // if this comment has replies
        if (childCommentIDs) {
            fetchComments(childCommentIDs)
                .then(result => {
                    if (result.length > 0) {
                        setCommentKids(result);

                        // pass the length of an array excluding deleted comments
                        dispatch(increaseCommentCount(result.length));
                    }
                });
        }
    }

    useEffect(() => {
        showChildComments(comment.kids);
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
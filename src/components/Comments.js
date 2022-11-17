import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { increaseCommentCount, resetCommentCount } from "../store/commentCountReducer";
import { updateStoryComments } from "../store/storiesReducer";
import { fetchComments, fetchStory } from '../async/async';
import Comment from "./Comment";
import { Button, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

function Comments(props) {

    const dispatch = useDispatch();
    const story = useSelector(state => state.stories.stories.find(story => story.id === Number(props.id)));
    const commentCount = useSelector(state => state.commentCount.commentCount);

    const [comments, setComments] = useState([]);

    const listComments = comments.map((comment) => (
        <Comment
            comment={comment}
            key={comment.id}
        />
    ));

    useEffect(() => {
        // load all comments
        function getComments(commentIDs) {
            dispatch(resetCommentCount());

            if (commentIDs) {
                fetchComments(commentIDs)
                    .then(result => {
                        if (result.length > 0) {
                            setComments(result);

                            // pass the length of an array excluding deleted comments
                            dispatch(increaseCommentCount(result.length));
                        }
                    });
            }
        }

        getComments(story.kids);

        return () => dispatch(resetCommentCount());
    }, [story, dispatch]);

    function refreshStoryComments(id) {
        fetchStory(id)
            .then(story => {
                dispatch(updateStoryComments(story));
            });
    }

    return (
        <div>
            <Space size="middle">
                <div>Comments: {commentCount}</div>
                <Button onClick={() => refreshStoryComments(story.id)} icon={<ReloadOutlined />}>Refresh comments</Button>
            </Space>
            {listComments}
        </div>
    );
}

export default Comments;
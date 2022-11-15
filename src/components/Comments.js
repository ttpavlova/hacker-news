import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { increaseCommentCount, resetCommentCount } from "../store/commentCountReducer";
import { updateStoryComments } from "../store/storiesReducer";
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

    // load all comments
    function getComments(arrayOfIds) {
        dispatch(resetCommentCount());

        if (arrayOfIds) {
            Promise.all(arrayOfIds.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(result => {
                // don't show deleted comments
                const array = result.filter(comments => (!comments.dead && !comments.deleted));
                setComments(array);
                
                if (array.length > 0) {
                    // pass the length of an array excluding deleted comments
                    dispatch(increaseCommentCount(array.length));
                }
            })
            .catch(err => alert("Error while loading the data"));
        }
    }

    function refreshStoryComments(id) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(response => response.json())
            .then(story => {
                dispatch(updateStoryComments(story));
            })
            .catch(err => alert("Error while loading the data"));
    }

    useEffect(() => {
        getComments(story.kids);

        return () => dispatch(resetCommentCount());
    }, [story]);

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
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllStories, resetStories } from "../store/storiesReducer";
import { fetchLatestNews } from '../async/async';
import StoryCard from "./StoryCard";
import { Button, Col, Row, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

function News() {

    const dispatch = useDispatch();
    const stories = useSelector(getAllStories);

    const listStories = stories.map((story) => (
        <StoryCard
            id={story.id}
            key={story.id}
        />
    ));

    function refreshNews() {
        dispatch(resetStories());
        dispatch(fetchLatestNews());
    }

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchLatestNews()); // update the list every minute
        }, 60000);

        return () => clearInterval(interval); // represents the unmount function
    }, [dispatch]);

    if (stories.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Row>
                <Col md={24} lg={12}>
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{
                        display: 'flex',
                        }}
                    >
                        <Button onClick={() => refreshNews()} icon={<ReloadOutlined />}>Refresh news</Button>
                        {listStories}
                    </Space>
                </Col>
                <Col md={0} lg={12}></Col>
            </Row>
        </>
    );
}

export default News;
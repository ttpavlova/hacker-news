import React from "react";
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comments from "./Comments";
import Story from "./Story";
import { Button, Row, Col, Space } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';

function StoryPage(props) {

    const id = props.id;
    const story = useSelector(state => state.stories.stories.find(story => story.id === Number(props.id)));

    function backToNews() {
        props.history.goBack();
    }

    if (!story) {
        return <div>Loading...</div>;
    }

    return (
        <Row>
            <Col span={18}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Button onClick={() => backToNews()} icon={<ArrowLeftOutlined />}>Back to news</Button>
                    <Story id={id} />
                    <Comments id={id} />
                </Space>
            </Col>
            <Col span={6}></Col>
        </Row>
    );
}

export default withRouter(StoryPage);
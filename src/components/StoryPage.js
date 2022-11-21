import React from "react";
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comments from "./Comments";
import Story from "./Story";
import { Button, Row, Col, Space, Divider } from "antd";
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
            <Col md={24} lg={12}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Button onClick={() => backToNews()} icon={<ArrowLeftOutlined />}>Back to news</Button>
                    <Story id={id} />
                </Space>
                <Divider />
                <Comments id={id} />
            </Col>
            <Col md={0} lg={12}></Col>
        </Row>
    );
}

export default withRouter(StoryPage);
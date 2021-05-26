import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from "antd";
import PageTop from "../../../../components/layout/PageTop";


function Comment(props) {
    let [hidden, setHidden] = useState(false)
    return (
        <React.Fragment>
            <PageTop title={"点击评论管理"}/>
            <Row gutter={24}>
                <Col span={24}>
                    <div style={{height: "800px", width: "200px", margin: " 0 auto"}}>
                        <div style={{height: "50px", width: "200px", background: "skyBlue"}}>标题</div>
                        <div style={{
                            height: "300px",
                            width: "200px",
                            background: "yellow",
                            position: "relative",
                        }}>内容
                            <div style={{
                                height: "100px",
                                width: "200px",
                                background: "green",
                                position: "absolute",
                                bottom: "28px",
                            }} hidden={hidden}>评论框</div>
                            <div style={{
                                position: "absolute",
                                width: "100%",
                                bottom: 0
                            }}>
                                <Button style={{
                                    width: "100%",
                                }} onClick={() => {
                                    setHidden(!hidden)
                                }}>评论</Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Comment;

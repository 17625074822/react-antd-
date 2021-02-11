import React, {useState, useEffect} from "react";
import common from "../../../utils/common";
import {Card, Col, Row, Tabs} from "antd";
import "./index.less";
import UserList from "../UserList";
import RedEnvelopeList from "../../gift/RedEnvelopeList";

let initialUser = {
    id: "",
    nickname: "c.y.kong",
    sex: "男",
    avatar: "",
    birthday: "20201-10-01",
    city: "扬州",
    height: "170",
    weight: "60",
    likeSex: "女",
    createdAt: "20201-10-01",
    lastSignIn: "20201-10-01",

}

const {TabPane} = Tabs;
const {Meta} = Card;

function UserDetail(props) {
    let {id} = props
    let [user, setUser] = useState(initialUser)

    let getUser = () => {
        let params = {
            id: id
        }
        common.loadingStart()
        common.ajax('get', '', params)
            .then(res => {
                // 设置用户详情
                console.log('userDetail', res)
                user = res
                setUser(user)
            })
            .finally(common.loadingStop)
    }
    useEffect(() => {
        // getUser()
    }, [])

    return (<div className={"user-detail-wrap"}>
        <Row gutter={24}>
            <Col span={6}>
                <Card cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                      style={{width: 240}}
                >
                    <Meta title={"用户昵称：" + user.nickname}/>
                    <Meta title={"性别：" + user.sex}/>
                    <Meta title={"所在地：" + user.city}/>
                    <Meta title={"生日：" + user.birthday}/>
                    <Meta title={"身高：" + user.height + " cm"}/>
                    <Meta title={"体重：" + user.weight + " kg"}/>
                    <Meta title={"性取向：" + user.likeSex}/>
                    <Meta title={"注册时间：" + user.createdAt}/>
                    <Meta title={"最后一次登录时间：" + user.lastSignIn}/>
                </Card>
            </Col>
            <Col span={18}>
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="好友列表" key="1">
                        <UserList id={id}/>
                    </TabPane>
                    <TabPane tab="红包列表" key="2">
                        <RedEnvelopeList userId={id}/>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    </div>)
}

export default UserDetail
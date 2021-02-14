import React, {useState, useEffect} from "react";
import common from "../../../utils/common";
import {Button, Card, Col, Pagination, Row, Table, Tabs} from "antd";
import "./index.less";
import RedEnvelopeList from "../../gift/RedEnvelopeList";
import userConfig from "../../../utils/userConfig";
import FriendList from "../FriendList";

const {TabPane} = Tabs;
const {Meta} = Card;
const {sexAlias, statusAlias} = userConfig

let initialUser = {
    uuid: "",
    nickname: "",
    sex: 0,
    avatar: "",
    birthday: 0,
    area: "",
    height: 0,
    weight: 0,
    sexualOrientation: 0,
    createdTime: 0,
    lastSignIn: 0,
}

function UserDetail(props) {
    let {uuid} = props
    let [user, setUser] = useState(initialUser)
    let [selectUserUuId, setSelectUserUuId] = useState("") //选中的用户uuid
    let [followFriendTotal, setFollowFriendTotal] = useState(0) // 关注的好友总数
    let [followFriendList, setFollowFriendList] = useState([]) // 关注的好友列表
    let [followFriendPagination, setFollowFriendPagination] = useState({
        page: 1,
        limit: 15,
    })
    let [beFollowFriendTotal, setBeFollowFriendTotal] = useState(0) // 被关注的好友总数
    let [beFollowFriendList, setBeFollowFriendList] = useState([]) // 被关注的好友列表
    let [beFollowFriendPagination, setBeFollowFriendPagination] = useState({
        page: 1,
        limit: 15,
    })


    // 获取用户资料
    let getUer = () => {
        common.loadingStart()
        common.ajax('get', '/im/im_user/get/' + uuid)
            .then(res => {
                console.log("用户信息", res)
                setUser(res.value || initialUser)
            })
            .finally(common.loadingStop)
    }


    // 获取该用户关注列表
    let getFollowerFriend = () => {
        console.log("uuid", uuid)
        common.loadingStart();
        // common.ajax('get', '/im/im_user/findFollowingListByUuid/' + friendPagination.page + "/" + friendPagination.limit +
        common.ajax('get', "/im/im_user/findFollowingListByUuid?uuid=" + uuid)
            .then(data => {
                followFriendList = data.list || []
                setFollowFriendList([...followFriendList])
                setFollowFriendTotal(data.total)
            }).finally(() => {
            common.loadingStop();
        })
    }

    // 获取该用户被关注列表
    let getBeFollowerFriend = () => {
        console.log("uuid", uuid)
        common.loadingStart();
        // common.ajax('get', '/im/im_user/findBeFollowingListByUuid/' + friendPagination.page + "/" + friendPagination.limit +
        common.ajax('get', "/im/im_user/findBeFollowingListByUuid?uuid=" + uuid)
            .then(data => {
                console.log("被关注的好友列表", data)
                beFollowFriendList = data.list || []
                setBeFollowFriendList([...beFollowFriendList])
                setBeFollowFriendTotal(data.total)
            }).finally(() => {
            common.loadingStop();
        })
    }
    useEffect(() => {
        if (uuid) {
            // 获取用户信息
            getUer()
            // 获取关注列表
            getFollowerFriend()
            // 获取被关注列表
            getBeFollowerFriend()
        }
    }, [uuid])


    // 好友列
    const friendColumns = [
        {
            title: '用户昵称',
            dataIndex: 'username',
            width: 150,
            ellipsis: true,
        },
        {
            title: '用户头像',
            dataIndex: 'avatar',
            width: 150,
            ellipsis: true,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 100,
            ellipsis: true,
            render: (text, record) => sexAlias.hasOwnProperty(record.sex) ? sexAlias[record.sex] : '未知'
        },
        {
            title: '出生日期',
            dataIndex: 'birthday',
            width: 100,
            ellipsis: true,
        },
        {
            title: '所在地',
            dataIndex: 'area',
            width: 150,
            ellipsis: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            ellipsis: true,
            render: (text) => statusAlias.hasOwnProperty(text) ? statusAlias[text] : text
        },
        {
            title: '操作',
            width: 80,
            fixed: "right",
            align: 'center',
            render: (text, record) => (
                <div className="action-btns">
                    <Button type={"link"} onClick={() => {
                        // 设置选中的用户id
                        selectUserUuId = record.uuid
                        setSelectUserUuId(selectUserUuId)
                        // setUserDetailVisible(true)
                    }}>详情</Button>
                </div>
            )
        },
    ]


    return (<div className={"user-detail-wrap"}>
        <Row gutter={24}>
            <Col span={6}>
                <Card cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                      style={{width: 240}}>
                    <Meta title={"用户昵称：" + user.username}/>
                    <Meta title={"性别：" + sexAlias[user.sex]}/>
                    <Meta title={"所在地：" + user.area}/>
                    <Meta title={"生日：" + user.birthday}/>
                    <Meta title={"身高：" + user.height + " cm"}/>
                    <Meta title={"体重：" + user.weight + " kg"}/>
                    <Meta title={"性取向：" + sexAlias[user.sexualOrientation]}/>
                    <Meta title={"注册时间：" + user.createdTime}/>
                    <Meta title={"最后一次登录时间：" + user.lastSignIn}/>
                </Card>
            </Col>
            <Col span={18}>
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="关注列表" key="1">
                        <FriendList uuid={uuid} type={"follow"}/>
                    </TabPane>
                    <TabPane tab="被关注列表" key="2">
                        <FriendList uuid={uuid} type={"beFollow"}/>
                    </TabPane>
                    <TabPane tab="发红包列表" key="3">
                        <RedEnvelopeList userUuId={uuid}/>
                    </TabPane>
                    <TabPane tab="收红包列表" key="4">
                        <RedEnvelopeList userUuId={uuid}/>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    </div>)
}

export default UserDetail
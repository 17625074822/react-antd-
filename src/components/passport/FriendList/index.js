import React, {useEffect, useState} from 'react'
import common from "../../../utils/common";
import {ReloadOutlined, SearchOutlined} from '@ant-design/icons';
import {Modal, Row, Col, Form, Button, Input, Pagination, Table, Select} from "antd";
import moment from 'moment';
import SearchArea from "../../../components/layout/SearchArea";
import PageBottom from "../../../components/layout/PageBottom";
import UserDetail from "../UserDetail";
import userConfig from "../../../utils/userConfig";

const Option = Select.Option
const FormItem = Form.Item
let {sexAlias, statusAlias} = userConfig

function FriendList(props) {
    // uuid String类型 用户uuid
    // type String类型 默认位关注的好友 follow:关注  beFollow:被关注
    let {uuid = "", type = "follow"} = props

    // 表单方法
    const [form] = Form.useForm();
    let initialSearch = {
        uuid: uuid,
        username: "",
        mobile: "",
        area: "",
        status: userConfig.USER_STATUS_ALL // 全部
    }

    let [search, setSearch] = useState(initialSearch) // 搜索输入的内容
    let [query, setQuery] = useState(initialSearch)   // 提交ajax搜索值
    let [total, setTotal] = useState(0)    // 总记录条数
    let [friendList, setFriendList] = useState([]); // 好友列表
    let [userDetailVisible, setUserDetailVisible] = useState(false); // 用户信息弹框
    let [selectUserId, setSelectUserId] = useState(false); // 选择的用户id
    let [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
    })

    // 列
    const columns = [
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
            render: ((text, record, index) => {
                return "2020-10-02"
            })
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
                        selectUserId = record.uuid
                        setSelectUserId(selectUserId)
                        setUserDetailVisible(true)
                    }}>详情</Button>
                </div>
            )
        },
    ]

    // 获取该用户关注列表
    let getFollowerFriend = () => {
        console.log("uuid", uuid)
        common.loadingStart();
        // common.ajax('get', '/im/im_user/findFollowingListByUuid/' + friendPagination.page + "/" + friendPagination.limit +
        common.ajax('get', "/im/im_user/findFollowingListByUuid?uuid=" + uuid)
            .then(data => {
                console.log("关注的好友列表", data)
                friendList = data.list || []
                setFriendList([...friendList])
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
                friendList = data.list || []
                setFriendList([...friendList])
            }).finally(() => {
            common.loadingStop();
        })
    }
    useEffect(() => {
        if (uuid) {
            if (type === "follow") {
                // 获取关注列表
                getFollowerFriend()
            }
            if (type === "beFollow") {
                // 获取被关注列表
                getBeFollowerFriend()
            }
        }
    }, [uuid])

    return (
        <React.Fragment>
            {/*<SearchArea>*/}
            {/*    <Form form={form} className="ant-advanced-search-form">*/}
            {/*        <Row gutter={24}>*/}
            {/*            <Col span={6}>*/}
            {/*                <FormItem label={"用户昵称"}>*/}
            {/*                    <Input*/}
            {/*                        type="text"*/}
            {/*                        placeholder='请输入用户昵称'*/}
            {/*                        value={search.nickname}*/}
            {/*                        onChange={(e) => {*/}
            {/*                            setSearch({...search, nickname: (e.target.value).trim()})*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                </FormItem>*/}
            {/*            </Col>*/}
            {/*            <Col span={6}>*/}
            {/*                <FormItem label={"手机号码"}>*/}
            {/*                    <Input*/}
            {/*                        type="text"*/}
            {/*                        placeholder='请输入手机号码'*/}
            {/*                        value={search.phone}*/}
            {/*                        onChange={(e) => {*/}
            {/*                            setSearch({...search, mobile: (e.target.value).trim()})*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                </FormItem>*/}
            {/*            </Col>*/}
            {/*            <Col span={6}>*/}
            {/*                <FormItem label={"所在地址"}>*/}
            {/*                    <Input*/}
            {/*                        placeholder='请输入地址'*/}
            {/*                        value={search.city}*/}
            {/*                        onChange={(e) => {*/}
            {/*                            setSearch({...search, city: (e.target.value).trim()})*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                </FormItem>*/}
            {/*            </Col>*/}
            {/*            <Col span={6}>*/}
            {/*                <FormItem label={"状态"}>*/}
            {/*                    <Select*/}
            {/*                        value={search.status}*/}
            {/*                        style={{width: "100%"}}*/}
            {/*                        onChange={(val) => {*/}
            {/*                            setSearch({...search, status: val})*/}
            {/*                        }}>*/}
            {/*                        {*/}
            {/*                            Object.keys(statusAlias).map(key => {*/}
            {/*                                return <Option key={key} value={key}>{statusAlias[key]}</Option>*/}
            {/*                            })*/}
            {/*                        }*/}
            {/*                    </Select>*/}
            {/*                </FormItem>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row gutter={24}>*/}
            {/*            <Col span={24}>*/}
            {/*                <div className={'search-btns'}>*/}
            {/*                    <Button icon={<SearchOutlined/>} onClick={() => {*/}
            {/*                        setQuery(search)*/}
            {/*                        setPagination({...pagination, page: 1})*/}
            {/*                    }}>搜索</Button>*/}
            {/*                    <Button icon={<ReloadOutlined/>} onClick={() => {*/}
            {/*                        setSearch(initialSearch)*/}
            {/*                        setPagination({...pagination, page: 1})*/}
            {/*                        setQuery(initialSearch)*/}
            {/*                    }}>清空</Button>*/}
            {/*                    搜索方案保存*/}
            {/*                    <SearchPlanButton initSearch={initialSearch} url={'/passport/user'}*/}
            {/*                                      search={search} setSearch={setSearch}/>*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Form>*/}
            {/*</SearchArea>*/}
            <Table
                columns={columns}
                dataSource={friendList}
                scroll={{x: '100%', y: "360px"}}
                rowKey={'uuid'} pagination={false}/>
            <div>
                {/*用户详情*/}
                <Modal
                    style={{top: 20}}
                    title={'用户详情'}
                    visible={userDetailVisible}
                    footer={null} width={1000}
                    maskClosable={false}
                    onCancel={() => {
                        setUserDetailVisible(false)
                    }}
                >
                    <UserDetail uuid={selectUserId}/>
                </Modal>
            </div>


        </React.Fragment>
    );
}

export default FriendList;

import React, {useEffect, useState} from 'react'
import common from "../../../../utils/common";
import {ReloadOutlined, SearchOutlined} from '@ant-design/icons';
import {Modal, Row, Col, Form, Button, Input, Pagination, Table, Select} from "antd";
import moment from 'moment';
import SearchArea from "../../../../components/layout/SearchArea";
import PageTop from "../../../../components/layout/PageTop";
import PageBottom from "../../../../components/layout/PageBottom";
import {Link} from "react-router-dom";
// import UserDetail from "../../UserDetail";
import userConfig from "../../../../utils/userConfig";

const Option = Select.Option
const FormItem = Form.Item

const {sexAlias, statusAlias} = userConfig

let initialSearch = {
    uuid: "",
    username: "",
    mobile: "",
    city: "",
    status: userConfig.USER_STATUS_ALL
}

function User(props) {

    // 表单方法
    const [form] = Form.useForm();
    let [search, setSearch] = useState(initialSearch) // 搜索输入的内容
    let [query, setQuery] = useState(initialSearch)   // 提交ajax搜索值
    let [total, setTotal] = useState(0)    // 总记录条数
    let [userList, setUserList] = useState([]);
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
            title: '性取向',
            dataIndex: 'sexualOrientation',
            width: 100,
            ellipsis: true,
            render: (text, record) => sexAlias.hasOwnProperty(record.sexualOrientation) ? sexAlias[record.sexualOrientation] : '未知'
        },
        {
            title: '手机号码',
            dataIndex: 'mobile',
            width: 150,
            ellipsis: true,
        },
        {
            title: '出生日期',
            dataIndex: 'birthday',
            width: 100,
            ellipsis: true,
            render: (text => {
                return text ? moment(text).format("YYYY-MM-DD") : "未知"
            })
        },
        {
            title: '所在地',
            dataIndex: 'city',
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
                    <Link to={`/im/user/edit/${record.uuid}`}>详情</Link>
                </div>
            )
        },
    ]

    // 获取用户列表
    let getUserList = () => {
        common.loadingStart();
        let queryMap = {};
        Object.keys(query).forEach(key => {
            console.log("key", key)
            if (query[key] && query[key] != 0) {
                // 状态
                if (key == "status") {
                    queryMap[key] = query[key]
                } else {
                    queryMap[key] = {"$like": query[key]}
                }
            }
        })
        common.ajax('get', '/im/im_user_news/page/' +
            pagination.page + "/" + pagination.limit +
            "?query=" + encodeURI(
                JSON.stringify(queryMap)
            ))
            .then(data => {
                console.log("动态列表", data)
                userList = data.list || []
                setUserList(userList)
                setTotal(data.total)
            }).finally(() => {
            common.loadingStop();
        })
    }

    // 当前页码改变或每页数量改变
    let handlePageChange = (page, limit) => {
        setPagination({...pagination, page: page, limit: limit})
    }

    useEffect(() => {
        // getUserList()
    }, [pagination, query])


    return (
        <React.Fragment>
            <PageTop title={"动态列表管理"}/>
            <SearchArea>
                <Form form={form} className="ant-advanced-search-form">
                    <Row gutter={24}>
                        <Col span={6}>
                            <FormItem label={"用户昵称"}>
                                <Input
                                    type="text"
                                    placeholder='请输入用户昵称'
                                    value={search.username}
                                    onChange={(e) => {
                                        setSearch({...search, username: (e.target.value).trim()})
                                    }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"手机号码"}>
                                <Input
                                    type="text"
                                    placeholder='请输入手机号码'
                                    value={search.mobile}
                                    onChange={(e) => {
                                        setSearch({...search, mobile: (e.target.value).trim()})
                                    }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"所在地址"}>
                                <Input
                                    placeholder='请输入地址'
                                    value={search.city}
                                    onChange={(e) => {
                                        setSearch({...search, city: (e.target.value).trim()})
                                    }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"状态"}>
                                <Select
                                    value={search.status + ""}
                                    style={{width: "100%"}}
                                    onChange={(val) => {
                                        setSearch({...search, status: Number(val)})
                                    }}>
                                    {
                                        Object.keys(statusAlias).map(key => {
                                            key = key + ""
                                            console.log("key", statusAlias[key])
                                            return <Option key={key} value={key}>{statusAlias[key]}</Option>
                                        })
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <div className={'search-btns'}>
                                <Button icon={<SearchOutlined/>} onClick={() => {
                                    setQuery(search)
                                    setPagination({...pagination, page: 1})
                                }}>搜索</Button>
                                <Button icon={<ReloadOutlined/>} onClick={() => {
                                    setSearch(initialSearch)
                                    setPagination({...pagination, page: 1})
                                    setQuery(initialSearch)
                                }}>清空</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </SearchArea>
            <Table
                columns={columns}
                dataSource={userList}
                scroll={{x: '100%'}}
                rowKey={'uuid'} pagination={false}/>
            <PageBottom pagination={
                <Pagination
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageChange}
                    showTotal={total => `共${total}条`} total={total}
                    defaultCurrent={pagination.page}
                    defaultPageSize={pagination.limit}
                    current={pagination.page}
                    pageSizeOptions={['15', '30', '50', '100']}
                    showQuickJumper={true}
                    showSizeChanger/>
            }>
            </PageBottom>
        </React.Fragment>
    );
}

export default User;

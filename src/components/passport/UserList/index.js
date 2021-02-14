import React, {useEffect, useState} from 'react'
import common from "../../../utils/common";
import {ReloadOutlined, SearchOutlined} from '@ant-design/icons';
import {Modal, Row, Col, Form, Button, Input, Pagination, Table, Select} from "antd";
import moment from 'moment';
import SearchArea from "../../../components/layout/SearchArea";
import PageBottom from "../../../components/layout/PageBottom";
import UserDetail from "../UserDetail";

const Option = Select.Option
const FormItem = Form.Item

const SEX_UNKNOWN = 0;
const SEX_MEN = 1;
const SEX_WOMEN = 2;

let sexAlias = {
    [SEX_UNKNOWN]: '未知',
    [SEX_MEN]: '男',
    [SEX_WOMEN]: '女',
}

const USER_STATUS_ALL = 0;
const USER_STATUS_YES = 1;
const USER_STATUS_NO = 2;

const userStatusAlias = {
    [USER_STATUS_ALL]: '全部',
    [USER_STATUS_YES]: '有效',
    [USER_STATUS_NO]: '封禁',
}

function UserList(props) {
    // id String类型 用户id
    let {id = ""} = props

    // 表单方法
    const [form] = Form.useForm();
    let initialSearch = {
        id: id,
        nickname: '',
        mobile: '',
        city: '',
        status: USER_STATUS_YES.toString()
    }

    let [search, setSearch] = useState(initialSearch) // 搜索输入的内容
    let [query, setQuery] = useState(initialSearch)   // 提交ajax搜索值
    let [total, setTotal] = useState(0)    // 总记录条数
    let [userList, setUserList] = useState([]);
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
            dataIndex: 'nickname',
            width: 150,
            ellipsis: true,
            render: ((tex, record, index) => {
                return "殷世伟" + index
            })
        },
        {
            title: '用户头像',
            dataIndex: 'avatar',
            width: 150,
            ellipsis: true,
            render: ((tex, record, index) => {
                return "殷世伟头像" + index
            })
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
            dataIndex: 'city',
            width: 150,
            ellipsis: true,
            render: ((text, record, index) => {
                return "扬州"
            })
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
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
                        selectUserId = record.id
                        setSelectUserId(selectUserId)
                        setUserDetailVisible(true)
                    }}>详情</Button>
                </div>
            )
        },
    ]

    // 获取用户列表
    let getUserList = () => {
        let params = {
            ...query,
            page: pagination.page,
            limit: pagination.limit,
            //  ownerId: common.getUser().company.id,
            status: query.status
        }
        common.loadingStart();
        // 获取用户列表
        common.ajax('get', '/passport/user/list', params).then(data => {
            console.log("usersList", data)
            userList = data.users || []
            setUserList(userList)
            setTotal(data.pagination.total)
        }).finally(() => {
            common.loadingStop();
        })
    }

    //  当前页码改变或每页数量改变
    let handlePageChange = (page, limit) => {
        setPagination({...pagination, page: page, limit: limit})
    }

    useEffect(() => {
        getUserList()
    }, [pagination, query])


    return (
        <React.Fragment>
            <SearchArea>
                <Form form={form} className="ant-advanced-search-form">
                    <Row gutter={24}>
                        <Col span={6}>
                            <FormItem label={"用户昵称"}>
                                <Input
                                    type="text"
                                    placeholder='请输入用户昵称'
                                    value={search.nickname}
                                    onChange={(e) => {
                                        setSearch({...search, nickname: (e.target.value).trim()})
                                    }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"手机号码"}>
                                <Input
                                    type="text"
                                    placeholder='请输入手机号码'
                                    value={search.phone}
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
                                    value={search.status}
                                    style={{width: "100%"}}
                                    onChange={(val) => {
                                        setSearch({...search, status: val})
                                    }}>
                                    {
                                        Object.keys(userStatusAlias).map(key => {
                                            return <Option key={key} value={key}>{userStatusAlias[key]}</Option>
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
                                {/*搜索方案保存*/}
                                {/*<SearchPlanButton initSearch={initialSearch} url={'/passport/user'}*/}
                                {/*                  search={search} setSearch={setSearch}/>*/}
                            </div>
                        </Col>
                    </Row>
                </Form>
            </SearchArea>
            <Table
                onRow={record => {
                    //  return {
                    //      onClick: () => {
                    //          if (record.status != USER_STATUS_NO) {
                    //              let num = -1
                    //              rows.forEach((item, number) => {
                    //                  if (item.id === record.id) {
                    //                      num = number
                    //                  }
                    //              })
                    //              let selectedRows = rows
                    //              if (num > -1) {
                    //                  selectedRows.splice(num, 1)
                    //              } else {
                    //                  selectedRows.push(record)
                    //              }
                    //              rowSelection.onChange(selectedRows.map((item) => item.id), selectedRows)
                    //          }
                    //      }
                    //  }
                }}
                //  rowSelection={rowSelection}
                columns={columns}
                dataSource={userList}
                scroll={{x: '100%', y: "360px"}}
                rowKey={'id'} pagination={false}/>
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
                    <UserDetail id={selectUserId}/>
                </Modal>
            </div>


        </React.Fragment>
    );
}

export default UserList;

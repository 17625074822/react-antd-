import React, {useEffect, useState} from 'react'
import PageTop from "../../../../components/layout/PageTop";
import SearchArea from "../../../../components/layout/SearchArea";
import {Button, Col, Form, Input, Pagination, Row, Select, Table} from "antd";
import {ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import PageBottom from "../../../../components/layout/PageBottom";
import common from "../../../../utils/common";

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

function RedEnvelope(props) {

    // id String类型 用户id

    // 表单方法
    const [form] = Form.useForm();
    let initialSearch = {
        nickname: '',
        mobile: '',
        city: '',
        status: USER_STATUS_YES.toString()
    }
    let [redEnvelopeList, setRedEnvelopeList] = useState([]); // 红包列表
    let [search, setSearch] = useState(initialSearch) // 搜索输入的内容
    let [query, setQuery] = useState(initialSearch)   // 提交ajax搜索值
    let [total, setTotal] = useState(0)    // 总记录条数
    let [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
    })

    useEffect(() => {
        redEnvelopeList = []
        for (let i = 0; i < 15; i++) {
            redEnvelopeList.push({
                id: i,
                money: i + 100,
                createdAt: i + "2020-10-04",
                status: "是",
                receiveAt: "2020-01-04",
                receiverNickname: "殷世伟" + i,
                receiverAvatar: "receiverAvatar" + i,
                receiverSex: "男",
                receiverBirthday: "2020-10-02",
                receiverCity: "扬州",
            })
        }
        console.log('redEnvelopeList', redEnvelopeList)
        setRedEnvelopeList(redEnvelopeList)
    }, [])


    // 列
    const columns = [
        {
            title: '发红包人昵称',
            dataIndex: 'receiverNickname',
            width: 150,
            ellipsis: true,
            render: ((text, record, index) => {
                return "扬州"
            })
        },
        {
            title: '发红包人头像',
            dataIndex: 'receiverAvatar',
            width: 150,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
        },
        {
            title: '发红包人性别',
            dataIndex: 'receiverSex',
            width: 150,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
        },
        {
            title: '发红包人出生日期',
            dataIndex: 'receiverBirthday',
            width: 170,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
        },
        {
            title: '发红包人所在地',
            dataIndex: 'receiverCity',
            width: 150,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
        },
        {
            title: '红包金额',
            dataIndex: 'money',
            width: 100,
            ellipsis: true,
            render: ((tex, record, index) => {
                return "殷世伟" + index
            })
        },
        {
            title: '收红包人昵称',
            dataIndex: 'receiverNickname',
            width: 150,
            ellipsis: true,
            render: ((text, record, index) => {
                return "扬州"
            })
        },
        {
            title: '收红包人头像',
            dataIndex: 'receiverAvatar',
            width: 150,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
        },
        {
            title: '收红包人性别',
            dataIndex: 'receiverSex',
            width: 150,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
        },
        {
            title: '收红包人出生日期',
            dataIndex: 'receiverBirthday',
            width: 170,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
        },
        {
            title: '收红包人所在地',
            dataIndex: 'receiverCity',
            width: 150,
            ellipsis: true,
            render: (text) => userStatusAlias.hasOwnProperty(text) ? userStatusAlias[text] : text
        },
        {
            title: '是否已拆',
            dataIndex: 'status',
            width: 100,
            ellipsis: true,
            render: (text, record) => sexAlias.hasOwnProperty(record.sex) ? sexAlias[record.sex] : '未知'
        },
        {
            title: '收红包日期',
            dataIndex: 'receiveAt',
            width: 130,
            ellipsis: true,
            render: ((text, record, index) => {
                return "2020-10-02"
            })
        },
        {
            title: '发红包日期',
            dataIndex: 'createdAt',
            width: 130,
            ellipsis: true,
            render: ((tex, record, index) => {
                return "殷世伟头像" + index
            })
        },
        // {
        //     title: '操作',
        //     width: 80,
        //     fixed: "right",
        //     align: 'center',
        //     render: (text, record) => (
        //         <div className="action-btns">
        //             <Link to={`/passport/user/edit/${record.id}`}>详情</Link>
        //         </div>
        //     )
        // },
    ]

    // 获取红包列表
    let getRedEnvelopeList = () => {
        let params = {
            ...query,
            page: pagination.page,
            limit: pagination.limit,
            //  ownerId: common.getUser().company.id,
            status: query.status
        }
        common.loadingStart();
        // 获取用户列表
        common.ajax('get', '/gift/redEnvelope/list', params).then(data => {
            console.log("redEnvelope", data)
            // redEnvelopeList = data.users || []
            setRedEnvelopeList(redEnvelopeList)
            setTotal(data.pagination.total)
        }).finally(() => {
            common.loadingStop();
        })
    }

    // 当前页码改变或每页数量改变
    let handlePageChange = (page, limit) => {
        setPagination({...pagination, page: page, limit: limit})
    }

    useEffect(() => {
        // getRedEnvelopeList()
    }, [pagination, query])


    return (
        <React.Fragment>
            {/*标题*/}
            <PageTop title={'红包信息管理'}/>
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
                dataSource={redEnvelopeList}
                scroll={{x: '100%'}}
                rowKey={'id'} pagination={false}/>
            <PageBottom children={
                <div>
                    {/*<Button onClick={() => {*/}
                    {/*    if (keys.length <= 0) {*/}
                    {/*        common.confirm('请选择数据')*/}
                    {/*        return*/}
                    {/*    }*/}

                    {/*    common.confirm('确定禁用吗？', () => {*/}
                    {/*        disableByIds()*/}
                    {/*    })*/}
                    {/*}}>禁用</Button>*/}
                </div>
            } pagination={
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

export default RedEnvelope;

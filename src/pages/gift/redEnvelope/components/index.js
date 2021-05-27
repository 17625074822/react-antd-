import React, {useEffect, useState} from 'react'
import PageTop from "../../../../components/layout/PageTop";
import SearchArea from "../../../../components/layout/SearchArea";
import {Button, Col, Form, Input, Pagination, Row, Select, Table} from "antd";
import {ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import PageBottom from "../../../../components/layout/PageBottom";
import common from "../../../../utils/common";
import redEnvelopeConfig from "../../../../utils/redEnvelopeConfig";
import moment from "moment";

const {sexAlias, statusAlias} = redEnvelopeConfig

const Option = Select.Option
const FormItem = Form.Item

function RedEnvelope(props) {

    // id String类型 用户id

    // 表单方法
    const [form] = Form.useForm();
    let initialSearch = {
        username: "",
        mobile: "",
        status: redEnvelopeConfig.STATUS_ALL
    }
    let [redEnvelopeList, setRedEnvelopeList] = useState([]); // 红包列表
    let [search, setSearch] = useState(initialSearch) // 搜索输入的内容
    let [query, setQuery] = useState(initialSearch)   // 提交ajax搜索值
    let [total, setTotal] = useState(0)    // 总记录条数
    let [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
    })


    // 列
    const columns = [
        {
            title: '发红包人昵称',
            dataIndex: 'senderName',
            width: 150,
            ellipsis: true,
        },
        {
            title: '发红包人头像',
            dataIndex: 'senderAvatar',
            width: 150,
            ellipsis: true,
        },
        {
            title: '发红包人性别',
            dataIndex: 'senderSex',
            width: 150,
            ellipsis: true,
            render: (text) => sexAlias.hasOwnProperty(text) ? sexAlias[text] : text
        },
        {
            title: '发红包人出生日期',
            dataIndex: 'senderBirthday',
            width: 170,
            ellipsis: true,
            render: (text => {
                return text ? moment(text).format("YYYY-MM-DD") : "未知"
            })
        },
        {
            title: '发红包人所在地',
            dataIndex: 'senderArea',
            width: 150,
            ellipsis: true,
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
            dataIndex: 'receiverName',
            width: 150,
            ellipsis: true,
        },
        {
            title: '收红包人头像',
            dataIndex: 'senderName',
            width: 150,
            ellipsis: true,
        },
        {
            title: '收红包人性别',
            dataIndex: 'receiverSex',
            width: 150,
            ellipsis: true,
            render: (text) => sexAlias.hasOwnProperty(text) ? sexAlias[text] : text
        },
        {
            title: '收红包人出生日期',
            dataIndex: 'receiverBirthday',
            width: 170,
            ellipsis: true,
            render: (text => {
                return text ? moment(text).format("YYYY-MM-DD") : "未知"
            })
        },
        {
            title: '收红包人所在地',
            dataIndex: 'receiverArea',
            width: 150,
            ellipsis: true,
        },
        {
            title: '是否已拆',
            dataIndex: 'status',
            width: 100,
            ellipsis: true,
            render: (text, record) => statusAlias.hasOwnProperty(record.status) ? statusAlias[record.status] : '未知'
        },
        {
            title: '收红包日期',
            dataIndex: 'receiveTime',
            width: 130,
            ellipsis: true,
            render: (text => {
                return text ? moment(text).format("YYYY-MM-DD") : "未知"
            })
        },
        {
            title: '发红包日期',
            dataIndex: 'createdTime',
            width: 130,
            ellipsis: true,
            render: (text => {
                return text ? moment(text).format("YYYY-MM-DD") : "未知"
            })
        },
    ]

    // 获取红包列表
    let getRedEnvelopeList = () => {
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
        // 获取用户列表
        common.ajax('get', '/gift/red_envelope/page/' +
            pagination.page + "/" + pagination.limit +
            "?query=" + encodeURI(
                JSON.stringify(queryMap)))
            .then(data => {
                console.log("redEnvelope", data)
                redEnvelopeList = data.list || []
                setRedEnvelopeList(redEnvelopeList)
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
        // getRedEnvelopeList()
    }, [pagination, query])


    return (
        <React.Fragment>
            {/*标题*/}
            <PageTop title={'红包信息管理'}/>
            <SearchArea>
                <Form form={form} className="ant-advanced-search-form">
                    <Row gutter={24}>
                        <Col span={12}>
                            <FormItem label={"发包人昵称"}>
                                <Input
                                    type="text"
                                    placeholder='请输入发包人昵称'
                                    value={search.senderName}
                                    onChange={(e) => {
                                        setSearch({...search, senderName: (e.target.value).trim()})
                                    }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={"红包状态"}>
                                <Select
                                    value={search.status + ""}
                                    style={{width: "100%"}}
                                    onChange={(val) => {
                                        setSearch({...search, status: Number(val)})
                                    }}>
                                    {
                                        Object.keys(statusAlias).map(key => {
                                            key = key + ""
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
                dataSource={redEnvelopeList}
                scroll={{x: '100%'}}
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

        </React.Fragment>
    );
}

export default RedEnvelope;

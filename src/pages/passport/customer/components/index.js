import React, {useEffect, useState} from 'react'
import common from "../../../../utils/common";
import {DownloadOutlined, PlusOutlined, ReloadOutlined, SearchOutlined} from '@ant-design/icons';
import {Row, Col, Form, Button, Divider,
    Input, Pagination, Table, Select, Modal,
} from "antd";
import moment from 'moment';
import SearchArea from "../../../../components/layout/SearchArea";
import PageTop from "../../../../components/layout/PageTop";
import PageBottom from "../../../../components/layout/PageBottom";
import {Link} from "react-router-dom";
// import SearchPlanButton from "../../../../components/support/SearchPlanButton";

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

const CUSTOMER_STATUS_ALL = 0;
const CUSTOMER_STATUS_YES = 1;
const CUSTOMER_STATUS_NO = 2;

const customerStatusAlias = {
    [CUSTOMER_STATUS_ALL]: '全部',
    [CUSTOMER_STATUS_YES]: '启用',
    [CUSTOMER_STATUS_NO]: '禁用',
}

const initialCustomer = {
    id: "",
}

function Customer(props) {
    //表单方法
    const [form] = Form.useForm();
    let initialSearch = {
        email: '',
        phone: '',
        name: '',
        customerSourceId: "",
        status: CUSTOMER_STATUS_YES.toString()
    }
    let [search, setSearch] = useState(initialSearch) //搜索输入的内容
    let [query, setQuery] = useState(initialSearch)   //提交ajax搜索值
    let [total, setTotal] = useState(0)    //总记录条数
    let [customerList, setCutomerList] = useState();
    let [customerSource, setCustomerSource] = useState([])   //客户来源
    let [customerTypeList, setCustomerTypeList] = useState([]) //客户类型
    let [keys, setKeys] = useState([])//选中行
    let [rows, setRows] = useState([]) // 选择的数据
    let [pagination, setPagination] = useState({
        page: 1,
        limit: 15,
    })

    //列
    const columns = [
        {
            title: '编号',
            dataIndex: 'code',
            width: 150,
            ellipsis: true,
        },
        {
            title: '客户名称',
            dataIndex: 'name',
            width: 150,
            ellipsis: true,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 100,
            ellipsis: true,
            render: (text, record, index) => sexAlias.hasOwnProperty(record.sex) ? sexAlias[record.sex] : '未知'
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            ellipsis: true,
            render: (text, record, index) => customerStatusAlias.hasOwnProperty(text) ? customerStatusAlias[text] : text
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            ellipsis: true,
            width: 150,
        },
        {
            title: '客户类型',
            dataIndex: 'customerTypeId',
            width: 150,
            ellipsis: true,
            render: text => {
                return (customerTypeList.map(item => {
                    if (text === item.id) {
                        return item.name
                    }
                }))
            }
        },
        {
            title: '客户来源',
            dataIndex: 'customerSourceId',
            width: 150,
            ellipsis: true,
            render: text => {
                return (customerSource.map(item => text === item.id ? item.name : null))
            }
        },
        {
            title: '微信号',
            dataIndex: 'wechat',
            ellipsis: true,
            width: 150,
        },
        {
            title: 'QQ号',
            dataIndex: 'qq',
            ellipsis: true,
            width: 150,
        },
        {
            title: '邮箱地址',
            dataIndex: 'email',
            ellipsis: true,
            width: 150,
        },
        {
            title: '身份证',
            dataIndex: 'idcard',
            ellipsis: true,
            width: 150,
        },
        {
            title: '创建人',
            dataIndex: 'creatorName',
            width: 100,
            ellipsis: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 150,
            ellipsis: true,
            render: text => {
                return (<div>{moment(text).format("YYYY-MM-DD")}</div>)
            }
        },
        {
            title: '操作',
            width: 80,
            fixed: "right",
            align: 'center',
            render: (text, record) => (
                <div className="action-btns">
                    <Link to={`/passport/customer/edit/${record.id}`}>编辑</Link>
                </div>
            )
        },
    ]

    //获取客户列表
    // let getCustomerList = () => {
    //     let params = {
    //         page: pagination.page,
    //         limit: pagination.limit,
    //         email: query.email,
    //         phone: query.phone,
    //         name: query.name,
    //         customerSourceId: query.customerSourceId,
    //         // ownerId: common.getUser().company.id,
    //         status: query.status
    //     }
    //     common.loadingStart();
    //     //获取客户列表
    //     common.ajax('get', '/passport/customer/list', params).then(data => {
    //         // common.consoleLog("customers", data.customers)
    //         setCutomerList(data.customers)
    //         setTotal(data.pagination.total)
    //     }).finally(() => {
    //         common.loadingStop();
    //     })
    // }

    //获取客户来源
    // let getCustomerSource = () => {
    //     common.loadingStart()
    //     common.ajax('get', '/passport/term/findByTaxonomy', {taxonomy: "customerSource"})
    //         .then((res) => {
    //             res = res.filter(item => item.status != 2)
    //             setCustomerSource([...res])
    //         })
    //         .finally(() => {
    //             common.loadingStop()
    //         })
    // }

    //获取客户类型
    // let getCustomerType = () => {
    //     common.loadingStart()
    //     common.ajax('get', '/passport/term/findByTaxonomy', {taxonomy: "customerType"})
    //         .then((res) => {
    //             res = res.filter(item => item.status != 2)
    //             common.consoleLog("customerType", res)
    //             setCustomerTypeList([...res])
    //         })
    //         .finally(() => {
    //             common.loadingStop()
    //         })
    // }
    //
    // useEffect(() => {
    //     getCustomerList()
    // }, [pagination, query])

    // 当前页码改变或每页数量改变
    // let handlePageChange = (page, limit) => {
    //     setPagination({...pagination, page: page, limit: limit})
    // }
    //
    // useEffect(() => {
    //     getCustomerSource()
    //     getCustomerType()
    // }, [])

    // let disableByIds = () => {
    //     let params = {
    //         customerIds: keys,
    //         ownerId: common.getUser().company.id
    //     }
    //     common.loadingStart()
    //     common.ajax('get', '/passport/customer/disableByIds', params).then(res => {
    //         customerList.forEach(item => {
    //             if (keys.indexOf(item.id) != -1) {
    //                 item.status = CUSTOMER_STATUS_NO
    //             }
    //         })
    //         setCutomerList([...customerList])
    //         setRows([])
    //         setKeys([])
    //         common.toast('禁用成功')
    //     }).finally(common.loadingStop)
    // }
    //
    // const rowSelection = {
    //     type: 'checkbox',
    //     selectedRowKeys: keys,
    //     preserveSelectedRowKeys: true,
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         setKeys(selectedRowKeys)
    //         setRows(selectedRows)
    //     },
    //     getCheckboxProps: record => ({
    //         disabled: record.status == CUSTOMER_STATUS_NO, // Column configuration not to be checked
    //     }),
    // };

    return (
        <React.Fragment>
            <PageTop title={'客户档案管理'}>
                <Button icon={<PlusOutlined/>} type="primary" onClick={() => {
                    props.history.push('/passport/customer/create')
                }}>新增</Button>
            </PageTop>
            <SearchArea>
                <Form form={form} className="ant-advanced-search-form">
                    <Row gutter={24}>
                        <Col span={6}>
                            <FormItem label={"客户姓名"}>
                                <Input
                                    type="text"
                                    placeholder='请输入客户姓名'
                                    value={search.name}
                                    onChange={(e) => {
                                        setSearch({...search, name: (e.target.value).trim()})
                                    }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"联系电话"}>
                                <Input
                                    type="text"
                                    placeholder='请输入客户名称'
                                    value={search.phone}
                                    onChange={(e) => {
                                        setSearch({...search, phone: (e.target.value).trim()})
                                    }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label={"客户来源"}>
                                <Select
                                    value={search.customerSourceId}
                                    style={{width: "100%"}}
                                    onChange={(val) => {
                                        // common.consoleLog(customerSource)
                                        setSearch({...search, customerSourceId: val})
                                    }}>
                                    <Option key={""} value={""}>全部</Option>
                                    {
                                        customerSource.map(item => {
                                            return <Option value={item.id}
                                                           key={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
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
                                        Object.keys(customerStatusAlias).map(key => {
                                            return <Option key={key} value={key}>{customerStatusAlias[key]}</Option>
                                        })
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <FormItem label={"客户邮箱"}>
                                <Input
                                    placeholder='请输入邮箱'
                                    value={search.email}
                                    onChange={(e) => {
                                        setSearch({...search, email: (e.target.value).trim()})
                                    }}
                                />
                            </FormItem>
                        </Col>
                        <Col span={18}>
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
                                {/*<SearchPlanButton initSearch={initialSearch} url={'/passport/customer'}*/}
                                {/*                  search={search} setSearch={setSearch}/>*/}
                            </div>
                        </Col>
                    </Row>
                </Form>
            </SearchArea>
            <Table
                onRow={record => {
                    // return {
                    //     onClick: () => {
                    //         if (record.status != CUSTOMER_STATUS_NO) {
                    //             let num = -1
                    //             rows.forEach((item, number) => {
                    //                 if (item.id === record.id) {
                    //                     num = number
                    //                 }
                    //             })
                    //             let selectedRows = rows
                    //             if (num > -1) {
                    //                 selectedRows.splice(num, 1)
                    //             } else {
                    //                 selectedRows.push(record)
                    //             }
                    //             rowSelection.onChange(selectedRows.map((item) => item.id), selectedRows)
                    //         }
                    //     }
                    // }
                }}
                // rowSelection={rowSelection}
                columns={columns}
                dataSource={customerList}
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
                    // onChange={handlePageChange}
                    // onShowSizeChange={handlePageChange}
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

export default Customer;

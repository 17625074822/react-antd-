import React, {useEffect, useState} from 'react'
import {Layout, Menu} from "antd";
import common from "../../../utils/common"
import {
    MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, RedEnvelopeOutlined
} from '@ant-design/icons';
import "./index.less"
import {Link, withRouter} from "react-router-dom"
import {useHistory} from "react-router-dom";
import {connect} from "react-redux"
import HeaderBar from "../HeaderBar";
import {switchMenu, switchMenuItem} from "../../../redux/action";

const {Header, Sider, Content} = Layout
const {SubMenu} = Menu

const menuTreeNode = [
    {
        title: "用户管理",
        icon: <UserOutlined/>,
        key: 'im',
        children: [
            {title: '用户列表', url: '/im/user', key: "user"},
            {title: '动态列表', url: '/im/news', key: "news"},
        ]
    },
    {
        title: "测试案例",
        icon: <UserOutlined/>,
        key: 'example',
        children: [
            {title: '点击评论', url: '/example/comment', key: "comment"},
            {title: '精准匹配', url: '/example/exact', key: "exact"},
            {title: '字体尺寸', url: '/example/fontSize', key: "fontSize"},
            {title: '流式布局', url: '/example/flex', key: "flex"},
        ]
    },
    {
        title: "红包管理",
        icon: <RedEnvelopeOutlined/>,
        key: 'gift',
        children: [
            {title: '红包列表', url: '/gift/redEnvelope', key: "redEnvelope"},
        ]
    }
]

function SideLayout(props) {
    const {dispatch} = props
    let history = useHistory()
    let [openKeys, setOpenKeys] = useState([])
    let [selectedKeys, setSelectedKeys] = useState([])
    let [collapsed, setCollapsed] = useState(false)
    let toggle = () => {
        setCollapsed(!collapsed)
    };

    //点击菜单展开
    let onOpenChange = (openKeys) => {
        setOpenKeys(openKeys)
    }

    // 点击子菜单跳转页面
    let handleMenuItemClick = (item, key, keyPath, domEvent) => {
        history.push(item.item.props.url)
        selectedKeys = [item.key]
        setSelectedKeys(selectedKeys)
        console.log("selectedKeys", selectedKeys)
    }

    // 菜单栏
    useEffect(() => {
        let pathname = window.location.pathname.replace(/#|\?.*$/g, '')// 获取路由地址
        let pathnameArr = pathname.split("/").filter(item => item !== "")
        openKeys = [pathnameArr.shift()]
        setOpenKeys([...openKeys])
        selectedKeys = [pathnameArr.pop()]
        setSelectedKeys(selectedKeys)


    }, [])

    useEffect(() => {
        let pathname = window.location.pathname.replace(/#|\?.*$/g, '')// 获取路由地址
        let pathnameArr = pathname.split("/").filter(item => item !== "")
        console.log(123)
        console.log(pathnameArr, "pathnameArr")
        // 设置面包屑 存到redux中
        menuTreeNode.forEach(item => {
            if (item.key === pathnameArr[0]) {
                console.log(item.title)
                dispatch(switchMenu(item.title))
                item.children.forEach(children => {
                    console.log(children, "children")
                    if (children.key === pathnameArr[1]) {
                        console.log("children.title", children.title)
                        dispatch(switchMenuItem(children.title))
                    }
                })
            }
        })
    }, [props])


    return (
        <Layout className={"SideLayout"}>
            <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
                <div className="logo">
                    <Link to={'/'}>
                        <div className="logo">
                            {collapsed ? 'mc' : 'Demo'}
                        </div>
                    </Link>
                    {/*<Link className="logo" >*/}
                    {/*    {collapsed ? 'mc' : 'Demo'}*/}
                    {/*</Link>*/}
                </div>
                <Menu openKeys={openKeys} selectedKeys={selectedKeys}
                      mode="inline" onClick={handleMenuItemClick} onOpenChange={onOpenChange}>
                    {
                        menuTreeNode.map((sub, subIndex) => (
                            <SubMenu key={sub.key} icon={sub.icon} title={sub.title}>
                                {
                                    sub.children.map((item, itemIndex) => {
                                        return (
                                            <Menu.Item
                                                key={item.key}
                                                url={item.url}>
                                                {item.title}
                                            </Menu.Item>
                                        )
                                    })
                                }
                            </SubMenu>

                        ))
                    }
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>
                    {
                        collapsed ?
                            <MenuUnfoldOutlined
                                className="trigger"
                                onClick={toggle}
                            /> :
                            <MenuFoldOutlined
                                className="trigger"
                                onClick={toggle}
                            />
                    }

                    {/* 面包屑 */}
                    <HeaderBar/>

                    <Menu
                        // theme={headerTheme}
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{
                            lineHeight: '45px', float: 'right',
                            // borderColor: "#fff"
                        }}>
                        <SubMenu title={
                            <span className="submenu-title-wrapper">{"管理员"}</span>
                        }>
                            <Menu.Item key="changePassword" onClick={() => {
                                // setPassVisible(true)
                            }}>修改密码</Menu.Item>
                            <Menu.Item key="logout" onClick={() => {
                                // common.setToken(null)
                                common.redirectToLogin()
                            }}>退出登录</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Content className="content">
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}

// const mapStateToProps = state => {
//     return {
//         menuName: state.menuName
//     }
// }

export default withRouter(connect()(SideLayout))

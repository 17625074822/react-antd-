import React, {useEffect, useState} from 'react'
import {Button, Layout, Menu} from "antd";
import {connect} from 'react-redux'
import common from "../../../utils/common"
import {
    MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, RedEnvelopeOutlined
} from '@ant-design/icons';
import "./index.less"
import {Link, withRouter} from "react-router-dom"
import {useHistory} from "react-router-dom";

const {Header, Sider, Content} = Layout
const {SubMenu} = Menu

const menuTreeNode = [
    {
        title: "用户管理",
        icon: <UserOutlined/>,
        children: [
            {title: '用户列表', url: '/im/user'},
        ]
    },
    {
        title: "红包管理",
        icon: <RedEnvelopeOutlined/>,
        children: [
            {title: '红包列表', url: '/gift/redEnvelope'},
        ]
    }
]

function Index(props) {

    let history = useHistory()
    let defaultOpenKeys = "/"
    let [collapsed, setCollapsed] = useState(false)

    let toggle = () => {
        setCollapsed(!collapsed)
    };

    // 点击菜单跳转页面
    function handleMenuClick(item, key, keyPath, domEvent) {
        console.log(console.log("key", key, keyPath, domEvent))
        console.log("url", item.item.props.url)
        history.push(item.item.props.url)
    }

    // 高度自适应
    useEffect(() => {
        console.log("进来了")
        let content = document.getElementsByClassName('content')[0]
        content.style.minHeight = window.innerHeight - 78 + "px";
    }, [props])

    return (
        <Layout className={"SideLayout"}>
            <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
                <div className="logo">
                    <Link to={'/'}>
                        <div className="logo">{collapsed ? 'MC' : 'Social MC'}</div>
                    </Link>
                </div>
                <Menu theme="dark" mode="inline" onClick={handleMenuClick}>
                    {
                        menuTreeNode.map((sub, subIndex) => (
                            <SubMenu key={subIndex} icon={sub.icon} title={sub.title}>
                                {
                                    sub.children.map((item, itemIndex) => {
                                        return (
                                            <Menu.Item
                                                key={`sub${subIndex}-${itemIndex}`}
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
                    <Menu
                        // theme={headerTheme}
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '45px', float: 'right', borderColor: "#fff"}}
                    >
                        <SubMenu
                            title={
                                <span className="submenu-title-wrapper">{"管理员"}</span>
                            }
                        >
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

// const mapStateToProps = (state) => {
//     return {
//         user: state.user,
//         permission: state.permission,
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         changeUser: (user) => {
//             dispatch({type: 'CHANGE_USER', user: user})
//         },
//         changeTasks: (tasks) => {
//             dispatch({type: 'CHANGE_TASKS', tasks: tasks})
//         }
//     }
// }
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))

export default Index


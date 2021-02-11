import React, {useEffect} from 'react'
import {Input, Button, Form} from 'antd';
import common from "../../../../utils/common"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "./index.less"
import Footer from "./footer.js";

function SignIn(props) {

    useEffect(() => {
        let origin = window.document.title
        window.document.title = 'Login'
        return () => {
            window.document.title = origin
        }
    }, [])

    const [form] = Form.useForm();

    function handleSubmit(values) {
        let params = {
            account: values.account,
            password: values.password
        };

        common.loadingStart()

        common.ajax("post", "/passport/user/createToken", params, {useToken: false}).then((data) => {

            //保存Token
            common.setToken(data.token)

            //拉取当前用户的基础信息
            common.ajax("get", "/passport/user/whoami").then((data) => {

                let user = {
                    nickname: data.nickname,
                    avatar: data.avatar,
                    tenant: {name: data.tenantName},
                    company: {id: data.companyId, name: data.companyName},
                    brand: {id: data.brandId, name: data.brandName},
                    type: data.type ? data.type : '',
                    tenantEmployee: data.tenantEmployee ? data.tenantEmployee : false,
                }

                // 获取当前用户在指定公司下的权限
                // common.ajax('get', '/passport/task/findTaskIdsByAuthUser', {companyId: data.companyId}).then((tasks) => {
                //     props.changeTasks(tasks)
                // })

                // todo
                // props.changeUser(user)

                //跳转到首页
                props.history.push("/")

                // if (data.type === 'tenant' || data.tenantEmployee) {
                //     //管理帐号、集团数据，直接跳转到集团后端，去配置初始数据
                //     props.history.push("/admin")
                // } else {
                //     //跳转到首页
                //     props.history.push("/")
                // }
            })

        }).finally(() => {
            common.loadingStop()
        })
    }

    return (
        <div className="Login">

            <div className='big-box'>
                <div className='main-part'>
                    <div className='left-box'>
                        <div className='introduce'>
                            {/*<h2>左则显示内容待定</h2>*/}
                            {/*<h2>设计张图片放在这里吧</h2>*/}
                        </div>
                    </div>
                    <div className='right-box'>
                        <div className='login'>
                            <Form form={form} onFinish={handleSubmit} className="login-form login-username"
                                  onKeyDown={e => {
                                      //Enter 回车
                                      if (e.keyCode === 13) {
                                          form.submit()
                                      }
                                  }}>

                                <div className='login-top'>
                                    <h2 className='login-title'>登录</h2>
                                    {/*<div className='butt'><span className='no'>没有帐号?&nbsp;&nbsp;</span> <a>点此注册</a></div>*/}
                                </div>
                                <Form.Item
                                    label={''}
                                    name={'account'}
                                    rules={[{required: true, message: '请输入账号'}]}
                                >
                                    <Input
                                        autoComplete="off"
                                        // placeholder="手机号@企业代码"
                                        placeholder="请输入账号"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={''}
                                    name={'password'}
                                    rules={[{required: true, message: '请输入密码'}]}
                                >
                                    <Input
                                        autoComplete="new-password"
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                </Form.Item>
                                {/*<div className='remember'>*/}
                                {/*    <div className='check'><label><input type='checkbox'/>*/}
                                {/*        <span className='me'>记住我</span></label>*/}
                                {/*    </div>*/}
                                {/*    <div className='note'>*/}
                                {/*        <a>短信验证登录</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className='login-button'>
                                    <Button onClick={() => {
                                        form.submit()
                                    }}>登 录</Button>
                                </div>
                                <div className='forgot'>
                                    忘记密码? <Link to="/forget">去重置</Link>
                                </div>

                            </Form>

                        </div>

                    </div>
                </div>

                <Footer/>


            </div>

        </div>
    );

}

// const mapStateToProps = (state) => {
//     return {
//         user: state.user
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

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
export default SignIn


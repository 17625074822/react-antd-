import React from 'react'
import {Switch, Route} from "react-router-dom"
import SideLayout from "./components/layout/SideLayout"
import IM from "./pages/im";
import Example from "./pages/example";
import RedEnvelope from "./pages/gift/redEnvelope/components";


function Welcome(props) {

    // 获取 html 元素
    var html = document.documentElement;

    // 封装一个函数
    function fontS() {
        // 获取 html 的宽
        var hW = html.offsetWidth;
        /* 计算字体大小（一般UI设计图是根据iPhone6的屏幕宽度设计的，即 宽为 750px）
        当 html 宽度大于 750px 时，html 的 font-size 为 100px;
        当 html 宽度小于 750px 时，html 的 font-size 为 html 宽度除以 7.5 (方便计算); */
        var hS;
        if (hW > 750) {
            hS = 100;
        } else {
            hS = hW / 7.5;
        }
        // 给的 html 设置字体大小
        html.style.fontSize = hS + "px";
    }

    fontS();
    // 当窗口大小改变时执行函数
    window.onresize = function () {
        fontS();
    }

    return (
        <div>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;<a>管理员，您好！</a>欢迎进入后台管理系统</h1>


            {/*<Quick/>*/}
        </div>
    )
}

function Home(props) {
    return (
        <div style={{height: "100%"}}>
            <SideLayout>
                <Switch>
                    <Route exact path={'/'} component={Welcome}/>
                    {/*<Route path={'/'} component={Welcome}/>*/}
                    <Route path={'/im'} component={IM}/>
                    <Route path={'/gift'} component={RedEnvelope}/>
                    <Route path={'/example'} component={Example}/>
                    {/*<Route path={'/wms'} component={Wms}/>*/}
                    {/*<Route path={'/finance'} component={FinanceRoute}/>*/}
                    {/*<Route path={'/support'} component={Support}/>*/}
                    {/*<Route path={'/sale'} component={Sale}/>*/}
                    {/*<Route path={'/coupon'} component={Coupon}/>*/}
                    {/*<Route path={'/crm'} component={Crm}/>*/}
                    {/*<Route path={'/avocation'} component={Avocation}/>*/}
                    {/*<Route path={'/report'} component={Statics}/>*/}
                    {/*<Route path={'/ext'} component={Ext}/>*/}
                </Switch>
            </SideLayout>
        </div>
    )
}


export default Home

// export default Home;
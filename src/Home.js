import React from 'react'
import {Switch, Route, Link} from "react-router-dom"
import SideLayout from "./components/layout/SideLayout"
import IM from "./pages/im";
import RedEnvelope from "./pages/gift/redEnvelope/components";
import {connect} from "react-redux"
import {Row} from "antd";

function Welcome(props) {
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
                    <Route path={'/im'} component={IM}/>
                    <Route path={'/gift'} component={RedEnvelope}/>
                    {/*<Route path={'/example'} component={Example}/>*/}
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
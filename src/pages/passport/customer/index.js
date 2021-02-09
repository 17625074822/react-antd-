import React from "react";
import {Route, Switch} from "react-router-dom";

import Index from "./components/index";
// import Create from "./components/create";
// import Edit from "./components/edit";
// import Vip from "./components/vipList"

function Customer() {

    return (
        <div>
            <Switch>
                <Route exact path={'/passport/customer'} component={Index}/>
                {/*<Route path={'/passport/customer/create'} component={Create}/>*/}
                {/*<Route path={'/passport/customer/edit/:id'} component={Edit}/>*/}
            </Switch>
        </div>
    )
}

export default Customer;
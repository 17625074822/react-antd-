import React from "react"
import {Button} from "antd";
import UserDetail from "../../../../components/passport/UserDetail";
import PageTop from "../../../../components/layout/PageTop";
import {RollbackOutlined} from "@ant-design/icons";


function Edit(props) {

    let uuid = props.match.params.uuid

    return (
        <React.Fragment>
            <PageTop title={"用户详情"}>
                <Button icon={<RollbackOutlined/>} onClick={() => {
                    props.history.goBack()//返回上一页
                }}>返回</Button>
            </PageTop>
                <UserDetail uuid={uuid}/>
        </React.Fragment>
    )
}

export default Edit
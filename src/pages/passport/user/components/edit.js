import React from "react"
import {Button} from "antd";
import UserDetail from "../../../../components/passport/UserDetail";
import PageTop from "../../../../components/layout/PageTop";
import {RollbackOutlined} from "@ant-design/icons";


function Edit(props) {

    let id = props.match.params.id
    console.log("id", id)

    return (
        <React.Fragment>
            <PageTop title={"用户详情"}>
                <Button icon={<RollbackOutlined/>} onClick={() => {
                    props.history.goBack()//返回上一页
                }}>返回</Button>
            </PageTop>
                <UserDetail id={id}/>
        </React.Fragment>
    )
}

export default Edit
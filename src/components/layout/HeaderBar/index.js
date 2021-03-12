import React from "react"
import {connect} from "react-redux"
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom"
import {switchMenu} from "../../../redux/action";

function HeaderBar(props) {
    const {menuName, menuItemName} = props;
    return (
        <span style={{display: "inline-block"}}>
            {
                menuName !== "" ?
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to='/' onClick={() => {
                            // 存到redux中
                            const {dispatch} = props
                            dispatch(switchMenu(""))
                        }}>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {menuName}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {menuItemName}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    : null
            }
        </span>
    )
}

const mapStateToProps = state => {
    return {
        menuName: state.menuName,
        menuItemName: state.menuItemName,
    }
};
export default connect(mapStateToProps)(HeaderBar)

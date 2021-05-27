import React, {useEffect, useState} from 'react'
import {Row, Col} from "antd";
import PageTop from "../../../../components/layout/PageTop";
import "./index.less"

function Comment(props) {
    let [now, setNow] = useState("")

    // 获取当前时间
    let getCurrentDate = () => {
        setInterval(() => {
            let d = new Date();
            now = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            setNow(now)
        }, 1000)
    }
    getCurrentDate()

    // useEffect(() => {
    // }, [])

    return (
        <div id={"exact"} style={{position: "relative"}}>
            <PageTop title={"定时器"}/>
            <p>
                <span>当前时间:{now}</span>
            </p>
        </div>
    );
}

export default Comment;

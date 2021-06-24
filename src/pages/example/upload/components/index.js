import React, {useState} from 'react';
import {Drawer, Button} from 'antd';

function Upload(props) {
    let [visible, setVisible] = useState(false);
    let showDrawer = () => {
        setVisible(true);
    };
    let onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <form name="form1" id="form1">
                <input id="file" type="file" name="name"/>
                <input type="submit" />
            </form>
        </>
    );
};

export default Upload
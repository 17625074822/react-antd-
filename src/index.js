import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd';
import {Provider} from 'react-redux'
import configureStore from './redux/store/configureStore';
// Redux Store对象，管理所有的Redux状态
const store = configureStore();
ReactDOM.render(<ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);


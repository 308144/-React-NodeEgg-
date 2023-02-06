import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from '@/App';
import { StoreProvider } from '@/store';
import 'moment/dist/locale/zh-cn';
import '@/assets/css/reset.less';
moment.locale('zh-cn');
render(React.createElement(ConfigProvider, { locale: zh_CN },
    React.createElement(StoreProvider, null,
        React.createElement(Router, { basename: '/' },
            React.createElement(App, null)))), document.querySelector('#root'));
//# sourceMappingURL=main.js.map
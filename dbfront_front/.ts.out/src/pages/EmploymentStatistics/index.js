import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import { Specialized, Post, Enterprise } from './TabContent';
import styles from './index.module.less';
const breadcrumb = {
    routes: [
        {
            path: '/',
            breadcrumbName: '首页',
        },
        {
            path: '/employmentStatistics',
            breadcrumbName: '就业统计',
        },
    ],
};
const MaterialManageList = () => {
    const [state, setState] = useState('1');
    const items = [
        {
            key: '1',
            label: `按专业统计`,
            children: React.createElement(Specialized, { currencyType: state }),
        },
        {
            key: '2',
            label: `按岗位统计`,
            children: React.createElement(Post, { currencyType: state }),
        },
        {
            key: '3',
            label: `按企业统计`,
            children: React.createElement(Enterprise, { currencyType: state }),
        },
    ];
    const onChange = (key) => {
        setState(key);
    };
    return (React.createElement(PageContainer, { breadcrumb: breadcrumb },
        React.createElement(GridContent, null,
            React.createElement(Tabs, { className: styles.tabWrap, defaultActiveKey: '1', items: items, onChange: onChange }),
            ";")));
};
export default MaterialManageList;
//# sourceMappingURL=index.js.map
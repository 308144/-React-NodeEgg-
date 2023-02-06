import { GridContent, PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { useRef } from 'react';
import { convertListDataToProTable } from '@/utils/tools';
import { Button, message, Popover } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddUserModal, BulkAddUserModal } from '@/pages/UserManager/Modal';
import styles from './index.module.less';
import { useModel } from '@/store';
import { findAllUser, removeOneUser, echoOneUserData } from '@/pages/UserManager/api';
const detailSpecialized = () => {
    const actionRef = useRef();
    const { userInfo } = useModel('user');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bulkIsModalOpen, setBulkIsModalOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const resitFormDataRef = useRef();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            width: 48,
        },
        { align: 'center', title: '账号', dataIndex: 'userName', ellipsis: true },
        {
            align: 'center',
            title: '身份',
            dataIndex: 'identity',
            ellipsis: true,
            hideInSearch: true,
            render(_, record) {
                return identityContent(record);
            },
        },
        {
            align: 'center',
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => (React.createElement(Popover, { placement: 'bottom', zIndex: 2, content: () => content(record) },
                React.createElement(SettingOutlined, { className: styles.setting }))),
        },
    ];
    const identityContent = record => {
        const { identity } = record;
        if (identity === 'manager') {
            return '管理员';
        }
        else if (identity === 'student') {
            return '学生';
        }
    };
    const content = record => {
        return userInfo.identity === 'student' ? (React.createElement("div", { className: styles.settingBtn },
            React.createElement("p", { className: styles.disable }, "\u7F16\u8F91"),
            React.createElement("p", { className: styles.disable }, "\u5220\u9664"))) : (React.createElement("div", { className: styles.settingBtn },
            React.createElement("p", { onClick: () => updateOneData(record) }, "\u7F16\u8F91"),
            React.createElement("p", { onClick: () => deleteOneData(record) }, "\u5220\u9664")));
    };
    const updateOneData = async (record) => {
        const { userName } = record;
        const echoRes = await echoOneUserData(userName);
        const { data } = echoRes;
        if (echoRes.code === 0) {
            setIsModalOpen(true);
            resitFormDataRef.current = data[0];
            setIsUpdate(true);
        }
    };
    const deleteOneData = async (record) => {
        const { userName } = record;
        const res = await removeOneUser(userName);
        if (res.code === 0) {
            message.success('删除用户成功');
        }
        else {
            message.error('删除用户失败');
        }
        actionRef.current.reload();
    };
    const reload = () => {
        actionRef.current.reload();
    };
    const requestFun = async (params) => {
        for (const key in params) {
            if (typeof params[key] === 'string') {
                params[key] = params[key].trim();
            }
        }
        const res = await findAllUser({
            ...params,
        });
        const output = convertListDataToProTable(res);
        return output;
    };
    const bulkAddUserModal = () => {
        setBulkIsModalOpen(true);
    };
    const breadcrumb = {
        routes: [
            {
                path: '/',
                breadcrumbName: '首页',
            },
            {
                path: '/userManager',
                breadcrumbName: `用户管理`,
            },
        ],
    };
    return (React.createElement(PageContainer, { breadcrumb: breadcrumb },
        React.createElement(GridContent, null,
            React.createElement(ProTable, { toolBarRender: () => [
                    React.createElement(Button, { key: 'add', disabled: userInfo.identity === 'student', onClick: showModal, icon: React.createElement(PlusOutlined, null), type: 'primary' }, "\u65B0\u589E\u7528\u6237\u4FE1\u606F"),
                ], columns: columns, actionRef: actionRef, cardBordered: true, editable: {
                    type: 'multiple',
                }, request: requestFun, columnsState: {
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                }, rowKey: 'id', search: {
                    labelWidth: 'auto',
                }, options: {
                    setting: {
                        listsHeight: 400,
                    },
                }, pagination: {
                    pageSize: 5,
                    onChange: page => console.log(page),
                }, dateFormatter: 'string', headerTitle: React.createElement(React.Fragment, null,
                    React.createElement(Button, { disabled: userInfo.identity === 'student', key: 'logout', type: 'primary', onClick: bulkAddUserModal }, "\u6279\u91CF\u6DFB\u52A0\u7528\u6237\u4FE1\u606F")) }),
            React.createElement(AddUserModal, { isModalOpen: isModalOpen, setIsModalOpen: setIsModalOpen, reload: reload, isUpdate: isUpdate, setIsUpdate: setIsUpdate, formRefData: resitFormDataRef.current }),
            React.createElement(BulkAddUserModal, { bulkIsModalOpen: bulkIsModalOpen, setBulkIsModalOpen: setBulkIsModalOpen, reload: reload }))));
};
export default detailSpecialized;
//# sourceMappingURL=index.js.map
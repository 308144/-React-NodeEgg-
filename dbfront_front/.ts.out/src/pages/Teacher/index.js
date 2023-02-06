import { GridContent, PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { useRef } from 'react';
import { convertListDataToProTable } from '@/utils/tools';
import { Button, Popover } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { AddUserModal } from '@/pages/Teacher/Modal';
import { useModel } from '@/store';
import styles from './index.module.less';
import { findAllTeacher, echoOneTeacherData } from '@/pages/Teacher/api';
const detailSpecialized = () => {
    const actionRef = useRef();
    const { userInfo } = useModel('user');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [id, setId] = useState(null);
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
        { align: 'center', title: '教师姓名', dataIndex: 'teacherName', ellipsis: true },
        { align: 'center', title: '所属院系', dataIndex: 'faculty', ellipsis: true },
        { align: 'center', title: '教师手机号', dataIndex: 'teacherPhone', ellipsis: true },
        {
            align: 'center',
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => (React.createElement(Popover, { placement: 'bottom', zIndex: 2, content: () => content(record) },
                React.createElement(SettingOutlined, { className: styles.setting }))),
        },
    ];
    const content = record => {
        return userInfo.identity === 'student' ? (React.createElement("div", { className: styles.settingBtn },
            React.createElement("p", { className: styles.disable }, "\u7F16\u8F91"),
            React.createElement("p", { className: styles.disable }, "\u5220\u9664"))) : (React.createElement("div", { className: styles.settingBtn },
            React.createElement("p", { onClick: () => updateOneData(record) }, "\u7F16\u8F91"),
            React.createElement("p", { className: styles.disable }, "\u5220\u9664")));
    };
    const updateOneData = async (record) => {
        const { _id } = record;
        const echoRes = await echoOneTeacherData(_id);
        const { data } = echoRes;
        if (echoRes.code === 0) {
            setId(_id);
            setIsModalOpen(true);
            resitFormDataRef.current = data[0];
            setIsUpdate(true);
        }
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
        const res = await findAllTeacher({
            ...params,
        });
        const output = convertListDataToProTable(res);
        return output;
    };
    const breadcrumb = {
        routes: [
            {
                path: '/',
                breadcrumbName: '首页',
            },
            {
                path: '/faculty',
                breadcrumbName: `院系管理`,
            },
        ],
    };
    return (React.createElement(PageContainer, { breadcrumb: breadcrumb },
        React.createElement(GridContent, null,
            React.createElement(ProTable, { toolBarRender: () => [
                    React.createElement(Button, { key: 'add', disabled: userInfo.identity === 'student', onClick: showModal, icon: React.createElement(PlusOutlined, null), type: 'primary' }, "\u65B0\u589E\u6559\u5E08"),
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
                }, dateFormatter: 'string' }),
            React.createElement(AddUserModal, { id: id, isModalOpen: isModalOpen, setIsModalOpen: setIsModalOpen, reload: reload, isUpdate: isUpdate, setIsUpdate: setIsUpdate, formRefData: resitFormDataRef.current }))));
};
export default detailSpecialized;
//# sourceMappingURL=index.js.map
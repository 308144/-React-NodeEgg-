import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { EmploymentStatisticsList } from '@/pages/EmploymentStatistics/api';
import { useNavigate } from 'react-router-dom';
export const Specialized = (props) => {
    const [specializedState, setSpecializedState] = useState();
    const navigate = useNavigate();
    const { currencyType } = props;
    const getListData = async (currencyType) => {
        const res = await EmploymentStatisticsList(currencyType);
        const { data } = res;
        data.forEach((item, index) => {
            item['key'] = index + 1;
        });
        setSpecializedState(data);
    };
    useEffect(() => {
        getListData(currencyType);
    }, [currencyType]);
    const findDetail = (currencyType, record) => {
        const { _id } = record;
        navigate('/detail', { state: { currencyType, _id } });
    };
    const columns = [
        {
            align: 'center',
            title: '学生专业',
            dataIndex: '_id',
            key: 'specialized',
        },
        {
            align: 'center',
            title: '就业人数',
            dataIndex: 'specializedNumber',
            key: 'specializedNumber',
        },
        {
            align: 'center',
            title: '操作',
            key: 'option',
            render: (_, record) => (React.createElement(Button, { type: 'primary', onClick: () => {
                    findDetail(currencyType, record);
                } }, "\u67E5\u770B\u8BE6\u60C5")),
        },
    ];
    return React.createElement(Table, { columns: columns, dataSource: specializedState });
};
export const Post = (props) => {
    const [postState, setPostState] = useState();
    const navigate = useNavigate();
    const { currencyType } = props;
    const getListData = async (currencyType) => {
        const res = await EmploymentStatisticsList(currencyType);
        const { data } = res;
        data.forEach((item, index) => {
            item['key'] = index + 1;
        });
        setPostState(data);
    };
    useEffect(() => {
        getListData(currencyType);
    }, [currencyType]);
    const findDetail = (currencyType, record) => {
        const { _id } = record;
        navigate('/detail', { state: { currencyType, _id } });
    };
    const columns = [
        {
            align: 'center',
            title: '就业岗位',
            dataIndex: '_id',
            key: 'post',
        },
        {
            align: 'center',
            title: '就业人数',
            dataIndex: 'postNumber',
            key: 'postNumber',
        },
        {
            align: 'center',
            title: '操作',
            key: 'option',
            render: (_, record) => (React.createElement(Button, { type: 'primary', onClick: () => {
                    findDetail(currencyType, record);
                } }, "\u67E5\u770B\u8BE6\u60C5")),
        },
    ];
    return React.createElement(Table, { columns: columns, dataSource: postState });
};
export const Enterprise = (props) => {
    const [enterpriseState, setEnterpriseState] = useState();
    const { currencyType } = props;
    const navigate = useNavigate();
    const getListData = async (currencyType) => {
        const res = await EmploymentStatisticsList(currencyType);
        const { data } = res;
        data.forEach((item, index) => {
            item['key'] = index + 1;
        });
        setEnterpriseState(data);
    };
    useEffect(() => {
        getListData(currencyType);
    }, [currencyType]);
    const findDetail = (currencyType, record) => {
        const { _id } = record;
        navigate('/detail', { state: { currencyType, _id } });
    };
    const columns = [
        {
            align: 'center',
            title: '就业单位',
            dataIndex: '_id',
            key: 'enterprise',
        },
        {
            align: 'center',
            title: '就业人数',
            dataIndex: 'enterpriseNumber',
            key: 'enterpriseNumber',
        },
        {
            align: 'center',
            title: '操作',
            key: 'option',
            render: (_, record) => (React.createElement(Button, { type: 'primary', onClick: () => {
                    findDetail(currencyType, record);
                } }, "\u67E5\u770B\u8BE6\u60C5")),
        },
    ];
    return React.createElement(Table, { columns: columns, dataSource: enterpriseState });
};
//# sourceMappingURL=TabContent.js.map
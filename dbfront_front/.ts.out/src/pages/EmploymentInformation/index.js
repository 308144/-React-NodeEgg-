import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { createInformation, findInformation, removeOneInformation, updateOneInformation, echoOneInformationData, getSelectTeacherDatas, getInformationModalTeacherPhoneData, } from './api';
import { formRules } from './api/reg';
import { ProTable } from '@ant-design/pro-components';
import { Button, Col, DatePicker, Form, message, Modal, Popover, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { convertListDataToProTable } from '@/utils/tools';
import styles from './index.module.less';
import { useModel } from '@/store';
import { getFacultyData } from '@/api';
const { Option } = Select;
const EmploymentInformation = () => {
    const [searchCollapsed, setSearchCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoadng] = useState();
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const resitFormDataRef = useRef();
    const [updatePhoneState, setUpdatePhoneState] = useState();
    const [selectFacultyDatas, setSelectDatas] = useState();
    const [selectTeacherDatas, setSelectTeacherDatas] = useState();
    const [iselectTeacherDatas, setIselectTeacherDatas] = useState(true);
    const [iselectTeacherPhoneDatas, setIselectTeacherPhoneDatas] = useState(true);
    const [selectTeacherPhoneDatas, setSelectTeacherPhoneDatas] = useState();
    const [yuanXiChangeData, setYuanXiChangeData] = useState();
    const actionRef = useRef();
    const { userInfo } = useModel('user');
    const [form] = Form.useForm();
    const content = record => {
        return userInfo.identity === 'student' ? (React.createElement("div", { className: styles.settingBtn },
            React.createElement("p", { className: styles.disable }, "\u7F16\u8F91"),
            React.createElement("p", { className: styles.disable }, "\u5220\u9664"))) : (React.createElement("div", { className: styles.settingBtn },
            React.createElement("p", { onClick: () => updateOneData(record) }, "\u7F16\u8F91"),
            React.createElement("p", { onClick: () => deleteOneData(record) }, "\u5220\u9664")));
    };
    const sexContent = record => {
        const { sex } = record;
        if (sex === 1) {
            return '男';
        }
        else {
            return '女';
        }
    };
    const deleteOneData = async (record) => {
        const { phone, specialized, employmentUnits, employmentPost } = record;
        const res = await removeOneInformation({ phone, specialized, employmentUnits, employmentPost });
        if (res.code === 0) {
            message.success('删除成功');
        }
        else {
            message.error('删除失败');
        }
        actionRef.current.reload();
    };
    const updateOneData = async (record) => {
        setIsUpdate(true);
        const { phone } = record;
        setUpdatePhoneState(phone);
        const echoRes = await echoOneInformationData(phone);
        const { data } = echoRes;
        resitFormDataRef.current = data.records[0];
        console.log('resitFormDataRef.current', resitFormDataRef.current);
        if (echoRes.code === 0) {
            setIsModalOpen(true);
            form.setFieldsValue({
                class: resitFormDataRef.current.class,
                competencyRequirements: resitFormDataRef.current.competencyRequirements,
                employmentPost: resitFormDataRef.current.employmentPost,
                employmentTimer: resitFormDataRef.current.employmentTimer
                    ? moment(resitFormDataRef.current.employmentTimer, 'YYYY-MM-DD')
                    : undefined,
                employmentUnits: resitFormDataRef.current.employmentUnits,
                employmentUnitsAddress: resitFormDataRef.current.employmentUnitsAddress,
                name: resitFormDataRef.current.name,
                phone: resitFormDataRef.current.phone,
                sex: resitFormDataRef.current.sex,
                specialized: resitFormDataRef.current.specialized,
                treatment: resitFormDataRef.current.treatment,
                teacher: resitFormDataRef.current.teacher,
                faculty: resitFormDataRef.current.faculty,
                teacherPhone: resitFormDataRef.current.teacherPhone,
            });
        }
    };
    const getFaculty = async () => {
        const data = [];
        const res = await getFacultyData();
        if (res.code === 0) {
            const facultyArrayData = res.data.records.map(item => item.faculty);
            facultyArrayData?.map(item => {
                const a = { value: '', label: '' };
                a.value = item;
                a.label = item;
                data.push(a);
            });
            setSelectDatas(data);
        }
    };
    useEffect(() => {
        getFaculty();
    }, []);
    const phoneContent = record => {
        const { phone } = record;
        return React.createElement("div", { style: { height: '20', width: '15' } }, phone);
    };
    const columns = [
        { key: 'name', align: 'center', title: '姓名', dataIndex: 'name', ellipsis: true },
        {
            key: 'sex',
            align: 'center',
            title: '性别',
            dataIndex: 'sex',
            ellipsis: true,
            hideInSearch: true,
            render: (_, record) => sexContent(record),
        },
        {
            key: 'class',
            align: 'center',
            title: '班级',
            hideInSearch: true,
            dataIndex: 'class',
            ellipsis: true,
        },
        {
            key: 'specialized',
            align: 'center',
            title: '专业',
            dataIndex: 'specialized',
            ellipsis: true,
        },
        {
            key: 'faculty',
            align: 'center',
            title: '院系',
            dataIndex: 'faculty',
            ellipsis: true,
        },
        {
            key: 'teacher',
            align: 'center',
            title: '教师',
            dataIndex: 'teacher',
            ellipsis: true,
        },
        {
            key: 'phone',
            align: 'center',
            title: '电话',
            dataIndex: 'phone',
            ellipsis: true,
            render: (_, record) => (React.createElement(Popover, { content: () => phoneContent(record), trigger: 'click' },
                React.createElement("a", { style: { color: 'blue' } }, "\u67E5\u770B"))),
        },
        {
            width: 150,
            key: 'employmentTimer',
            align: 'center',
            title: '就业时间',
            dataIndex: 'employmentTimer',
            ellipsis: true,
            hideInSearch: true,
            render: (_, record) => {
                const { employmentTimer } = record;
                return employmentTimer.slice(0, 10);
            },
        },
        {
            key: 'employmentPost',
            align: 'center',
            title: '就业岗位',
            dataIndex: 'employmentPost',
            ellipsis: true,
        },
        {
            key: 'employmentUnits',
            align: 'center',
            title: '就业单位',
            dataIndex: 'employmentUnits',
            ellipsis: true,
        },
        {
            key: 'employmentUnitsAddress',
            align: 'center',
            title: '就业单位地址',
            dataIndex: 'employmentUnitsAddress',
            ellipsis: true,
            hideInSearch: true,
        },
        {
            key: 'competencyRequirements',
            width: 55,
            align: 'center',
            title: '待遇',
            dataIndex: 'treatment',
            ellipsis: true,
            hideInSearch: true,
        },
        {
            align: 'center',
            title: '操作',
            valueType: 'option',
            key: 'option',
            width: 70,
            render: (_, record) => (React.createElement(Popover, { placement: 'bottom', zIndex: 2, content: () => content(record) },
                React.createElement(SettingOutlined, { className: styles.setting }))),
        },
    ];
    const showModal = () => {
        setIsUpdate(false);
        form.resetFields();
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIselectTeacherDatas(true);
        setIselectTeacherPhoneDatas(true);
    };
    const onFinish = async (values) => {
        if (!isUpdate) {
            setIsLoadng(true);
            const res = await createInformation(values);
            if (res.data.code === 0) {
                setIsLoadng(false);
                setIsModalOpen(false);
                form.resetFields();
                const { msg } = res.data;
                message.success(msg);
                actionRef.current.reload();
                setIselectTeacherDatas(true);
            }
            else {
                message.error('创建学员失败');
                setIsLoadng(false);
            }
        }
        else {
            setIsUpdateLoading(true);
            const params = Object.assign(values, { idPhone: updatePhoneState });
            const updateRes = await updateOneInformation(params);
            if (updateRes.data.code === 0) {
                setIsUpdateLoading(false);
                setIsModalOpen(false);
                form.resetFields();
                const { msg } = updateRes.data;
                message.success(msg);
                actionRef.current.reload();
            }
            else {
                message.error('修改学员失败');
                setIsLoadng(false);
            }
        }
    };
    const requestFun = async (params) => {
        const { current, pageSize } = params;
        delete params.pageSize;
        for (const key in params) {
            if (typeof params[key] === 'string') {
                params[key] = params[key].trim();
            }
        }
        const res = await findInformation({
            current,
            size: pageSize,
            ...params,
        });
        const output = convertListDataToProTable(res.data);
        return output;
    };
    const teacherSelectChange = async (value) => {
        if (value) {
            setIselectTeacherPhoneDatas(false);
            const res = await getInformationModalTeacherPhoneData({
                teacherName: value,
                faculty: yuanXiChangeData,
            });
            fengzhuangModalFun(setSelectTeacherPhoneDatas, res, 2);
            console.log('selectTeacherPhoneDatas', selectTeacherPhoneDatas);
        }
    };
    const facultySelectChange = async (value) => {
        if (value) {
            setIselectTeacherDatas(false);
            setYuanXiChangeData(value);
            form.setFieldsValue({
                teacher: '',
                teacherPhone: ''
            });
            const res = await getSelectTeacherDatas(value);
            fengzhuangModalFun(setSelectTeacherDatas, res, 1);
        }
    };
    const fengzhuangModalFun = (setState, res, T) => {
        if (res.code === 0) {
            if (T == 1) {
                const states = [];
                const data = res.data.records.map(item => item.teacherName);
                data?.map(item => {
                    const a = { value: '', label: '' };
                    a.value = item;
                    a.label = item;
                    states.push(a);
                });
                setState(states);
            }
            else {
                console.log(111);
                const statess = [];
                const phoneData = res.data.records.map(item => item.teacherPhone);
                phoneData?.map(item => {
                    const a = { value: '', label: '' };
                    a.value = item;
                    a.label = item;
                    statess.push(a);
                });
                console.log('statess', statess);
                setState(statess);
            }
        }
    };
    const getFields = () => (React.createElement(React.Fragment, null,
        React.createElement(Col, { span: 8, key: 1 },
            React.createElement(Form.Item, { name: 'name', label: '\u59D3\u540D', rules: [
                    {
                        required: true,
                        message: '请输入姓名',
                    },
                ] },
                React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u59D3\u540D', autoSize: true }))),
        React.createElement(Col, { span: 8, key: 2 },
            React.createElement(Form.Item, { name: 'class', label: '\u73ED\u7EA7', rules: [
                    {
                        required: true,
                        message: '请输入班级',
                    },
                ] },
                React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u73ED\u7EA7', autoSize: true }))),
        React.createElement(Col, { span: 8, key: 3 },
            React.createElement(Form.Item, { name: 'specialized', label: '\u4E13\u4E1A', rules: [
                    {
                        required: true,
                        message: '请输入专业',
                    },
                ] },
                React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u73ED\u7EA7', autoSize: true }))),
        React.createElement(Col, { span: 8, key: 4 },
            React.createElement(Form.Item, { name: 'sex', label: '\u6027\u522B', rules: [
                    {
                        required: true,
                        message: '请输入性别',
                    },
                ] },
                React.createElement(Select, { placeholder: '\u8BF7\u9009\u62E9\u6027\u522B' },
                    React.createElement(Option, { value: 1 }, "\u7537"),
                    React.createElement(Option, { value: 0 }, "\u5973")))),
        React.createElement(Col, { span: 8, key: 5 },
            React.createElement(Form.Item, { name: 'phone', label: '\u624B\u673A\u53F7', rules: formRules.IphoneReg },
                React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', autoSize: true }))),
        React.createElement(Col, { span: 8, key: 6 },
            React.createElement(Form.Item, { name: 'treatment', label: '\u5F85\u9047', rules: [
                    {
                        required: true,
                        message: '请输入待遇',
                    },
                ] },
                React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u5F85\u9047', autoSize: true }))),
        React.createElement(Col, { span: 8, key: 7 },
            React.createElement(Form.Item, { name: 'employmentTimer', label: '\u5C31\u4E1A\u65F6\u95F4', rules: [
                    {
                        required: true,
                        message: '请输入就业时间',
                    },
                ] },
                React.createElement(DatePicker, null))),
        React.createElement(Col, { span: 8, key: 8 },
            React.createElement(Form.Item, { name: 'employmentPost', label: '\u5C31\u4E1A\u5C97\u4F4D', rules: [
                    {
                        required: true,
                        message: '请输入就业岗位',
                    },
                ] },
                React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u5C31\u4E1A\u5C97\u4F4D', autoSize: true }))),
        React.createElement(Col, { span: 8, key: 9 },
            React.createElement(Form.Item, { name: 'employmentUnits', label: '\u5C31\u4E1A\u5355\u4F4D', rules: [
                    {
                        required: true,
                        message: '请输入就业单位',
                    },
                ] },
                React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u5C31\u4E1A\u5355\u4F4D', autoSize: true }))),
        React.createElement(Col, { span: 8, key: 10 },
            React.createElement(Form.Item, { name: 'employmentUnitsAddress', label: '\u5C31\u4E1A\u5355\u4F4D\u5730\u5740', rules: [
                    {
                        required: true,
                        message: '请输入就业单位地址',
                    },
                ] },
                React.createElement(TextArea, { placeholder: '\u8BF7\u8F93\u5165\u5C31\u4E1A\u5355\u4F4D\u5730\u5740', autoSize: true }))),
        React.createElement(Col, { span: 8, key: 11 },
            React.createElement(Form.Item, { name: 'faculty', label: '\u9662\u7CFB', rules: [
                    {
                        required: true,
                        message: '请选择院系',
                    },
                ] },
                React.createElement(Select, { style: { width: '100%' }, options: selectFacultyDatas, onChange: facultySelectChange }))),
        React.createElement(Col, { span: 8, key: 12 },
            React.createElement(Form.Item, { name: 'teacher', label: '\u6559\u5E08', rules: [
                    {
                        required: true,
                        message: '请选择教师',
                    },
                ] },
                React.createElement(Select, { onChange: teacherSelectChange, style: { width: '100%' }, disabled: iselectTeacherDatas, options: selectTeacherDatas }))),
        React.createElement(Col, { span: 8, key: 13 },
            React.createElement(Form.Item, { name: 'teacherPhone', label: '\u6559\u5E08\u624B\u673A\u53F7' },
                React.createElement(Select, { style: { width: '100%' }, disabled: iselectTeacherPhoneDatas, options: selectTeacherPhoneDatas })))));
    return (React.createElement(React.Fragment, null,
        React.createElement(ProTable, { search: {
                collapsed: searchCollapsed,
                onCollapse: (collapsed) => {
                    setSearchCollapsed(collapsed);
                },
                optionRender: (_, { form }) => [
                    React.createElement(Button, { key: 'resetText', type: 'default', onClick: () => {
                            form?.resetFields();
                            form?.submit();
                        } }, "\u91CD\u7F6E"),
                    React.createElement(Button, { key: 'searchText', type: 'primary', onClick: () => {
                            form?.submit();
                        }, size: 'middle' }, "\u67E5\u8BE2"),
                ],
            }, toolBarRender: () => [
                React.createElement(Button, { disabled: userInfo.identity === 'student', key: 'add', onClick: showModal, icon: React.createElement(PlusOutlined, null), type: 'primary' }, "\u65B0\u589E\u5C31\u4E1A\u4FE1\u606F"),
            ], columns: columns, actionRef: actionRef, request: requestFun, rowKey: 'id', options: {
                setting: {
                    listsHeight: 400,
                },
            }, dateFormatter: 'string' }),
        React.createElement(Modal, { width: 1000, title: [
                React.createElement("div", { key: '1', className: 'modal' },
                    React.createElement("h2", null, "\u4E2A\u4EBA\u4FE1\u606F")),
            ], open: isModalOpen, onOk: handleOk, onCancel: handleCancel, footer: null, key: '1' },
            React.createElement(Form, { form: form, name: 'advanced_search', className: 'ant-advanced-search-form', onFinish: onFinish },
                React.createElement(Row, { gutter: 24 }, getFields()),
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24, style: { textAlign: 'right' } },
                        isUpdate ? (React.createElement(Button, { type: 'primary', htmlType: 'submit', loading: isLoading }, "\u4FEE\u6539")) : (React.createElement(Button, { type: 'primary', htmlType: 'submit', loading: isUpdateLoading }, "\u521B\u5EFA")),
                        React.createElement(Button, { style: { margin: '0 8px' }, onClick: () => {
                                form.resetFields();
                            } }, "\u91CD\u7F6E")))))));
};
export default EmploymentInformation;
//# sourceMappingURL=index.js.map
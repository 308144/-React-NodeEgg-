import { Button, Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { teacherCreate, updateTeacher } from '@/pages/Teacher/Modal/api';
import { useModel } from '@/store';
import { getFacultyData } from '@/api';
import { phoneRules } from '@/utils/tools';
const AddUserModal = (props) => {
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [isLoading, setIsLoadng] = useState();
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [selectDatas, setSelectDatas] = useState();
    const { isModalOpen, setIsModalOpen, reload, isUpdate, setIsUpdate, formRefData, id } = props;
    const { facultyInfo, setFacultyInfo } = useModel('faculty');
    useEffect(() => {
        setIsModalOpen(isModalOpen);
        console.log('facultyInfo', facultyInfo);
        if (facultyInfo) {
            selectData();
        }
    }, [isModalOpen]);
    useEffect(() => {
        setIsUpdate(isUpdate);
        if (isUpdate) {
            if (formRefData) {
                form.setFieldsValue({
                    teacherName: formRefData.teacherName,
                    faculty: formRefData.faculty,
                    teacherPhone: formRefData.teacherPhone,
                });
            }
        }
    }, [isUpdate]);
    useEffect(() => {
        getFaculty();
    }, []);
    const getFaculty = async () => {
        const res = await getFacultyData();
        if (res.code === 0) {
            setFacultyInfo(res.data.records.map(item => item.faculty));
        }
    };
    const selectData = () => {
        const data = [];
        facultyInfo?.map(item => {
            const a = { value: '', label: '' };
            a.value = item;
            a.label = item;
            data.push(a);
        });
        setSelectDatas(data);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setIsUpdate(false);
    };
    const onFinish = async (values) => {
        if (!isUpdate) {
            setIsLoadng(true);
            const res = await teacherCreate(values);
            if (res.code === 0) {
                setIsLoadng(false);
                setIsModalOpen(false);
                form.resetFields();
                message.success(res.msg);
                reload();
            }
            else {
                message.error(res.msg);
                setIsLoadng(false);
            }
        }
        else {
            setIsUpdateLoading(true);
            const res = await updateTeacher({ values, id, teacherPhone: formRefData.teacherPhone });
            if (res.code === 0) {
                setIsUpdateLoading(false);
                setIsModalOpen(false);
                setIsUpdate(false);
                form.resetFields();
                reload();
                message.success(res.msg);
            }
            else {
                message.error(res.msg);
                setIsLoadng(false);
            }
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { open: isModalOpen, title: [
                React.createElement("div", { key: '1', className: styles.title },
                    React.createElement("h2", null, "\u65B0\u589E\u6559\u5E08")),
            ], footer: null, onCancel: handleCancel },
            React.createElement(Form, { form: form, name: 'basic', labelCol: { span: 4, offset: 1 }, wrapperCol: { span: 16 }, initialValues: { remember: true }, onFinish: onFinish, autoComplete: 'off', ref: formRef },
                React.createElement(Form.Item, { wrapperCol: { offset: 1, span: 16 }, label: '\u6559\u5E08\u59D3\u540D', name: 'teacherName', rules: [{ required: true, message: '请输入教师姓名' }] },
                    React.createElement(Input, null)),
                React.createElement(Form.Item, { wrapperCol: { offset: 1, span: 16 }, label: '\u6240\u5C5E\u9662\u7CFB', name: 'faculty', rules: [{ required: true, message: '请输入院系' }] },
                    React.createElement(Select, { style: { width: '100%' }, options: selectDatas })),
                React.createElement(Form.Item, { wrapperCol: { offset: 1, span: 16 }, label: '\u6559\u5E08\u624B\u673A\u53F7', name: 'teacherPhone', rules: phoneRules.phoneExtensionsData },
                    React.createElement(Input, null)),
                React.createElement(Form.Item, { wrapperCol: { offset: 5, span: 16 } },
                    React.createElement(Button, { className: styles.cancel, onClick: handleCancel }, "\u53D6\u6D88"),
                    isUpdate ? (React.createElement(Button, { loading: isUpdateLoading, type: 'primary', className: styles.submit, htmlType: 'submit' }, "\u4FEE\u6539")) : (React.createElement(Button, { loading: isLoading, type: 'primary', className: styles.submit, htmlType: 'submit' }, "\u786E\u8BA4")))))));
};
export { AddUserModal };
//# sourceMappingURL=index.js.map
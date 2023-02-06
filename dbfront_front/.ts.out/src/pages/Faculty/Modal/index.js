import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { facultyCreate, updateFaculty } from '@/pages/Faculty/Modal/api';
import { useModel } from '@/store';
import { getFacultyData } from '@/api';
const AddUserModal = (props) => {
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [isLoading, setIsLoadng] = useState();
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const { isModalOpen, setIsModalOpen, reload, isUpdate, setIsUpdate, formRefData, id } = props;
    const { setFacultyInfo } = useModel('faculty');
    useEffect(() => {
        setIsModalOpen(isModalOpen);
    }, [isModalOpen]);
    useEffect(() => {
        setIsUpdate(isUpdate);
        if (isUpdate) {
            if (formRefData) {
                form.setFieldsValue({
                    faculty: formRefData.faculty,
                });
            }
        }
    }, [isUpdate]);
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setIsUpdate(false);
    };
    const getFaculty = async () => {
        const res = await getFacultyData();
        if (res.code === 0) {
            setFacultyInfo(res.data.records.map(item => item.faculty));
        }
    };
    const onFinish = async (values) => {
        if (!isUpdate) {
            setIsLoadng(true);
            const res = await facultyCreate(values);
            if (res.code === 0) {
                getFaculty();
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
            const res = await updateFaculty({ values, id, original: formRefData.faculty });
            if (res.code === 0) {
                getFaculty();
                setIsUpdateLoading(false);
                setIsModalOpen(false);
                setIsUpdate(false);
                form.resetFields();
                reload();
                message.success(res.msg);
            }
            else {
                message.error(res.msg);
                setIsUpdateLoading(false);
            }
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { open: isModalOpen, title: [
                React.createElement("div", { key: '1', className: styles.title },
                    React.createElement("h2", null, "\u65B0\u589E\u9662\u7CFB")),
            ], footer: null, onCancel: handleCancel },
            React.createElement(Form, { form: form, name: 'basic', labelCol: { span: 3 }, wrapperCol: { span: 16 }, initialValues: { remember: true }, onFinish: onFinish, autoComplete: 'off', ref: formRef },
                React.createElement(Form.Item, { wrapperCol: { offset: 1, span: 16 }, labelCol: { offset: 2 }, label: '\u9662\u7CFB', name: 'faculty', rules: [{ required: true, message: '请输入院系' }] },
                    React.createElement(Input, null)),
                React.createElement(Form.Item, { wrapperCol: { offset: 5, span: 16 } },
                    React.createElement(Button, { className: styles.cancel, onClick: handleCancel }, "\u53D6\u6D88"),
                    isUpdate ? (React.createElement(Button, { loading: isUpdateLoading, type: 'primary', className: styles.submit, htmlType: 'submit' }, "\u4FEE\u6539")) : (React.createElement(Button, { loading: isLoading, type: 'primary', className: styles.submit, htmlType: 'submit' }, "\u786E\u8BA4")))))));
};
export { AddUserModal };
//# sourceMappingURL=index.js.map
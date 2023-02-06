import { Button, Form, Input, message, Modal, Select, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { adminCreate, updateUser, uploadExcle } from '@/pages/UserManager/Modal/api';
import { CloudDownloadOutlined, FileDoneOutlined, UploadOutlined } from '@ant-design/icons';
import { selectFile } from '@/utils/tools';
const AddUserModal = (props) => {
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [isLoading, setIsLoadng] = useState();
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const { isModalOpen, setIsModalOpen, reload, isUpdate, setIsUpdate, formRefData } = props;
    useEffect(() => {
        setIsModalOpen(isModalOpen);
    }, [isModalOpen]);
    useEffect(() => {
        setIsUpdate(isUpdate);
        console.log('formRefData', formRefData);
        if (formRefData) {
            form.setFieldsValue({
                userName: formRefData.userName,
                password: formRefData.password,
                identity: formRefData.identity,
            });
        }
    }, [isUpdate]);
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsUpdate(false);
        form.resetFields();
    };
    const onFinish = async (values) => {
        if (!isUpdate) {
            setIsLoadng(true);
            const res = await adminCreate(values);
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
            const res = await updateUser(values);
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
                    React.createElement("h2", null, "\u6DFB\u52A0\u7528\u6237")),
            ], footer: null, onCancel: handleCancel },
            React.createElement(Form, { form: form, name: 'basic', labelCol: { span: 6 }, wrapperCol: { span: 18 }, initialValues: { remember: true }, onFinish: onFinish, autoComplete: 'off', ref: formRef },
                React.createElement(Form.Item, { wrapperCol: { offset: 1, span: 23 }, labelCol: { offset: 2 }, label: '\u8D26\u53F7', name: 'userName', rules: [{ required: true, message: '请输入账号' }] },
                    React.createElement(Input, { disabled: isUpdate })),
                React.createElement(Form.Item, { wrapperCol: { offset: 1, span: 23 }, labelCol: { offset: 2 }, label: '\u5BC6\u7801', name: 'password', rules: [{ required: true, message: '请输入密码' }] },
                    React.createElement(Input.Password, null)),
                React.createElement(Form.Item, { wrapperCol: { offset: 1, span: 23 }, labelCol: { offset: 2 }, label: '\u8EAB\u4EFD', name: 'identity', rules: [{ required: true, message: '请选择身份' }] },
                    React.createElement(Select, { style: { width: '100%' }, options: [
                            { value: 'student', label: '学生' },
                            { value: 'manager', label: '管理员' },
                        ] })),
                React.createElement(Form.Item, { wrapperCol: { offset: 5, span: 16 } },
                    React.createElement(Button, { className: styles.cancel, onClick: handleCancel }, "\u53D6\u6D88"),
                    isUpdate ? (React.createElement(Button, { loading: isUpdateLoading, type: 'primary', className: styles.submit, htmlType: 'submit' }, "\u4FEE\u6539")) : (React.createElement(Button, { loading: isLoading, type: 'primary', className: styles.submit, htmlType: 'submit' }, "\u786E\u8BA4")))))));
};
const BulkAddUserModal = props => {
    const { bulkIsModalOpen, reload, setBulkIsModalOpen } = props;
    const [importFile, setImportFile] = useState(null);
    const [importLoading, setImportLoading] = useState(false);
    useEffect(() => {
        setBulkIsModalOpen(bulkIsModalOpen);
    }, [bulkIsModalOpen]);
    const handleCancel = () => {
        setBulkIsModalOpen(false);
        setImportFile(null);
    };
    const onImportSubmit = () => {
        if (!importFile)
            return message.warning('请先上传文件');
        if (importLoading)
            return message.warning('请等待上传完毕后在上传文件');
        const content = `确认批量注销【${importFile.name}】吗?`;
        const modal = Modal.confirm({
            title: '提示',
            content,
            async onOk() {
                modal.destroy();
                setImportLoading(true);
                const formData = new FormData();
                formData.append('file', importFile);
                const res = await uploadExcle(formData);
                if (res.code === 0) {
                    message.success(res.msg);
                    setBulkIsModalOpen(false);
                    setImportFile(null);
                    reload();
                }
                else {
                    notification.error({
                        message: '出现错误',
                        description: res.msg,
                    });
                }
                setImportLoading(false);
            },
            onCancel() {
                modal.destroy();
            },
        });
    };
    const notXlsx = () => {
        if (importFile?.name) {
            notification.error({
                message: '文件类型错误',
                description: '请上传文件后缀为.xlsx文件，您可以下载我们提供的Excel模板文件，进修改后上传',
            });
            return ' 请上传文件';
        }
        else {
            return ' 请上传文件';
        }
    };
    const downBulkLogoutExcel = () => {
        location.href =
            'https://dbfront-firstbucket.oss-cn-chengdu.aliyuncs.com/%E6%89%B9%E9%87%8F%E6%A8%A1%E6%9D%BF.xlsx';
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { destroyOnClose: true, title: [
                React.createElement("div", { key: '1', className: styles.title },
                    React.createElement("h2", null, "\u6279\u91CF\u65B0\u589E\u7528\u6237\u4FE1\u606F")),
            ], open: bulkIsModalOpen, onCancel: handleCancel, footer: [
                React.createElement("div", { key: '1', className: styles.footer },
                    React.createElement(Button, { className: styles.cancel, key: 'cancel', onClick: handleCancel }, "\u53D6\u6D88"),
                    importFile?.name.split('.')[importFile?.name.split('.').length - 1] === 'xlsx' ? (React.createElement(Button, { type: 'primary', className: styles.submit, key: 'ok', onClick: onImportSubmit, loading: importLoading }, "\u63D0\u4EA4")) : (React.createElement(Button, { className: styles.disBtn, type: 'primary', key: 'ok', disabled: true }, "\u63D0\u4EA4"))),
            ] },
            React.createElement("div", { className: styles.faDocu },
                React.createElement("div", { className: styles.document }, "\u8BF7\u4E0A\u4F20\u6587\u4EF6"),
                React.createElement(Button, { icon: importFile ? React.createElement(FileDoneOutlined, null) : React.createElement(UploadOutlined, null), type: 'primary', onClick: () => selectFile('xlsx', setImportFile) }, importFile?.name.split('.')[importFile?.name.split('.').length - 1] === 'xlsx'
                    ? decodeURIComponent(importFile.name)
                    : notXlsx())),
            React.createElement("br", null),
            React.createElement(Button, { className: styles.tips, icon: React.createElement(CloudDownloadOutlined, null), type: 'link', onClick: downBulkLogoutExcel }, "\u4E0B\u8F7DExcel\u6A21\u677F"))));
};
export { AddUserModal, BulkAddUserModal };
//# sourceMappingURL=index.js.map
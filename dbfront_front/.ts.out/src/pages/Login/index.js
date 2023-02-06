import { Button, Form, Input, message } from 'antd';
import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { tokenStorage, userStorage } from '@/common/localStorage';
import { useMemoizedFn } from '@/hooks';
import { userLogin } from './api';
import { useModel } from '@/store';
import { phoneRules } from '@/utils/tools';
const LogInPage = () => {
    const { setUserInfo } = useModel('user');
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const onFinish = useMemoizedFn(async (values) => {
        const res = await userLogin(values);
        const { data } = res.data;
        if (res.data.code === 0) {
            const userData = JSON.stringify(res.data.data);
            userStorage.setItem(userData);
            setUserInfo(res.data.data);
            tokenStorage.setItem(`${data.token}`);
            navigate('/home');
            message.success('登录成功');
        }
        else {
            message.error(res.data.msg);
        }
    });
    useLayoutEffect(() => {
        if (tokenStorage.getItem()) {
        }
    }, []);
    return (React.createElement("div", { className: styles.box },
        React.createElement("div", { className: styles.child },
            React.createElement("h1", null, "\u9AD8\u6821\u5C31\u4E1A\u7BA1\u7406\u7CFB\u7EDF"),
            React.createElement(Form, { form: form, name: 'basic', wrapperCol: { offset: 1, span: 15 }, labelCol: { offset: 1, span: 4 }, initialValues: { remember: true }, onFinish: onFinish, autoComplete: 'off' },
                React.createElement(Form.Item, { label: '\u624B\u673A\u53F7', name: 'userName', rules: phoneRules.phoneExtensionsData },
                    React.createElement(Input, { placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7' })),
                React.createElement(Form.Item, { label: '\u5BC6\u7801', name: 'password', rules: [
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ] },
                    React.createElement(Input.Password, { placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801' })),
                React.createElement(Form.Item, { wrapperCol: { offset: 7, span: 16 } },
                    React.createElement(Button, { onClick: onReset, className: styles.resit }, "\u91CD\u7F6E"),
                    React.createElement(Button, { type: 'primary', htmlType: 'submit' }, "\u767B\u5F55"))))));
};
export default LogInPage;
//# sourceMappingURL=index.js.map
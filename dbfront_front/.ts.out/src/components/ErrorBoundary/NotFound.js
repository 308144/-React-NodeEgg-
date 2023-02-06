import { Button } from 'antd';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
const getErrMsg = (type, message = '页面出现异常') => {
    switch (type) {
        case 403:
            return '您暂无访问该页面权限，请联系管理员';
        case 404:
            return '404, 页面未找到!';
        default:
            return `${message}，请刷新或返回首页`;
    }
};
const NotFound = memo(props => {
    const { type, onRefresh, message } = props;
    const navigate = useNavigate();
    return (React.createElement("div", null,
        React.createElement("div", { className: styles.notFound },
            React.createElement("div", null,
                React.createElement("h2", { className: styles.notFoundTitle }, getErrMsg(type, message)),
                type === 500 && (React.createElement(Button, { type: 'primary', style: { marginLeft: 20 }, onClick: onRefresh }, "\u5237\u65B0")),
                (type === 404 || type === 403 || type === 500) && (React.createElement(Button, { type: 'primary', style: { margin: '0 20px' }, onClick: () => {
                        navigate('/');
                    } }, "\u56DE\u5230\u9996\u9875")),
                (type === 403 || type === 500) && (React.createElement(Button, { type: 'primary', onClick: () => navigate('/login') }, "\u91CD\u65B0\u767B\u5F55"))))));
});
export default NotFound;
//# sourceMappingURL=NotFound.js.map
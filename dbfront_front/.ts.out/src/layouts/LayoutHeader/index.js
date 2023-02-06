import { Dropdown, Layout, Menu, message } from 'antd';
import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import imgs from '@/assets/img/img.jpg';
import styles from './index.module.less';
import { useMemoizedFn } from '@/hooks';
import { logoutByMobile } from '@/pages/Login/api';
import { tokenStorage, userStorage } from '@/common/localStorage';
const { Header } = Layout;
const items = [{ label: '退出登录', key: 'layout' }];
const MainHeader = () => {
    const navigate = useNavigate();
    const onMenuClick = useMemoizedFn(async (props) => {
        switch (props.key) {
            case 'layout':
                const res = await logoutByMobile();
                if (res.data.code === 0) {
                    message.success('退出登录成功');
                    tokenStorage.removeItem();
                    userStorage.removeItem();
                }
                navigate('/login');
                break;
            default:
                break;
        }
    });
    const menu = useMemo(() => React.createElement(Menu, { onClick: onMenuClick, items: items }), []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, { className: styles.pandaLayoutHeader },
            React.createElement("div", { className: styles.header_left },
                React.createElement("div", { className: styles.img },
                    React.createElement("img", { width: '100%', height: '100%', src: imgs, alt: '\u5C0F\u56FE\u7247' })),
                React.createElement("h1", null,
                    React.createElement("strong", null, "\u9AD8\u6821\u5C31\u4E1A\u7BA1\u7406\u7CFB\u7EDF"))),
            React.createElement("div", { className: styles.userWrap },
                React.createElement(Dropdown, { overlay: menu },
                    React.createElement("div", null,
                        React.createElement("img", { width: 16, src: 'https://cdn01.xiongmaoboshi.com/asset/img/personalCenter-1656928659383-175.png' }),
                        "\u4E2A\u4EBA\u4E2D\u5FC3"))))));
};
export default memo(MainHeader);
//# sourceMappingURL=index.js.map
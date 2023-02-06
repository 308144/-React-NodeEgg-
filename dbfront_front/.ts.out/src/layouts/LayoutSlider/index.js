import { Layout, Menu } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { getMenuItemsByRoute } from './router';
import { useMemoizedFn } from '@/hooks';
import { routes } from '@/routes';
const { Sider } = Layout;
const reg = /\/\//g;
function getChildPath(pathname) {
    const pathSnippets = pathname.split('/');
    const length = pathSnippets.length;
    const newList = [];
    function getNewItem(parentPath, path, index) {
        if (index < length) {
            const currentPath = `${parentPath ? `${parentPath}` : parentPath}/${path}`.replace(reg, '/');
            newList.push(currentPath);
            getNewItem(currentPath, pathSnippets[index + 1], index + 1);
        }
    }
    getNewItem('', pathSnippets[0], 0);
    return newList;
}
const menuItems = getMenuItemsByRoute(routes);
const LayoutSlider = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const onMenuClick = useMemoizedFn(({ key }) => navigate(key));
    const { pathname } = useLocation();
    const selectedKeys = useMemo(() => getChildPath(pathname), [pathname]);
    return (React.createElement(Sider, { collapsed: collapsed, onCollapse: value => setCollapsed(value), collapsible: true, className: styles.slider, theme: 'dark' },
        React.createElement(Menu, { theme: 'dark', onClick: onMenuClick, defaultOpenKeys: selectedKeys, selectedKeys: selectedKeys, mode: 'inline', className: 'main-menu', items: menuItems })));
};
export default memo(LayoutSlider);
//# sourceMappingURL=index.js.map
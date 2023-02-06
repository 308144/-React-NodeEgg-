import React, { memo } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import styles from './index.module.less';
import LayoutHeader from './LayoutHeader';
import LayoutSlider from './LayoutSlider';
import { routes } from '@/routes';
const flatRoutes = [React.createElement(Route, { key: '*', path: '*', element: React.createElement(Navigate, { replace: true, to: '/404' }) })];
const noLayout = [React.createElement(Route, { key: '*', path: '*', element: React.createElement(Navigate, { replace: true, to: '/404' }) })];
const noLayoutMap = {};
const getFlatRoutes = (parentKey, routes = []) => {
    routes.forEach(item => {
        const { path, element } = item;
        if (!item.singlePage) {
            flatRoutes.push(React.createElement(Route, { key: parentKey + path, path: parentKey + path, element: element }));
            if (Array.isArray(item.routes) && item.routes.length) {
                flatRoutes.push(...getFlatRoutes(`${parentKey}${item.path}`, item.routes));
            }
        }
        else {
            noLayoutMap[path] = true;
            noLayout.push(React.createElement(Route, { key: path, path: path, element: element }));
        }
    });
    return flatRoutes;
};
getFlatRoutes('', routes);
const RenderRoutes = () => {
    const { pathname } = useLocation();
    return (React.createElement(React.Fragment, null, noLayoutMap[pathname] ? (React.createElement(Routes, null, noLayout.map(item => item))) : (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.layoutWrap },
            React.createElement(LayoutSlider, null),
            React.createElement("div", { className: styles.layout },
                React.createElement(LayoutHeader, null),
                React.createElement("div", { className: styles.contentWrap },
                    React.createElement(Routes, null, flatRoutes.map(item => item)))))))));
};
export default memo(RenderRoutes);
//# sourceMappingURL=index.js.map
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokenStorage } from '@/common/localStorage';
import Layouts from '@/layouts';
import { message } from 'antd';
const App = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const init = () => {
        if (tokenStorage.getItem() && document.cookie) {
            if (pathname === '/')
                navigate('/home');
        }
        else if (pathname !== '/login') {
            message.error('账号过期，请重新登录');
            navigate('/login');
        }
    };
    useEffect(init, [pathname]);
    return React.createElement(Layouts, null);
};
export default App;
//# sourceMappingURL=App.js.map
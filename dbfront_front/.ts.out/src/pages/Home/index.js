import React from 'react';
import styles from './index.module.less';
import { useModel } from '@/store';
const HomePage = () => {
    const { userInfo } = useModel('user');
    return (React.createElement("div", { className: styles.homePage },
        React.createElement("h1", null, "\u6B22\u8FCE\u6765\u5230\u9AD8\u6821\u5C31\u4E1A\u5B66\u5458\u7BA1\u7406\u7CFB\u7EDF"),
        React.createElement("h2", null, userInfo.userName)));
};
export default HomePage;
//# sourceMappingURL=index.js.map
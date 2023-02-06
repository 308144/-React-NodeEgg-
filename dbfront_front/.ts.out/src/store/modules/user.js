import { useState } from 'react';
import { LocalStorage } from '@/common/localStorage';
import { useMemoizedFn } from '@/hooks';
const userInfoStorage = new LocalStorage('user', {});
export default () => {
    const [userInfo, _setUserInfo] = useState(userInfoStorage.getItem());
    const setUserInfo = useMemoizedFn(value => {
        if (typeof value === 'function') {
            _setUserInfo(value(userInfo));
            userInfoStorage.setItem(value(userInfo));
        }
        else {
            userInfoStorage.setItem(value);
            _setUserInfo(value);
        }
    });
    return { userInfo, setUserInfo };
};
//# sourceMappingURL=user.js.map
import { useState } from 'react';
import { SessionStorage } from '@/common/storage';
import { useMemoizedFn } from '@/hooks';
const defaultValue = {
    logoImg: 'https://cdn01.xiongmaoboshi.com/asset/img/image-1656928659378-846.png',
    logoTitle: 'CMS-后台模版',
};
const logoStorage = new SessionStorage('logo', defaultValue);
export default () => {
    const [logoInfo, _setLogoInfo] = useState(logoStorage.getItem());
    const setLogoInfo = useMemoizedFn((value) => {
        if (typeof value === 'function') {
            const newVal = value(logoInfo);
            logoStorage.setItem(newVal);
            _setLogoInfo(newVal);
        }
        else {
            logoStorage.setItem(value);
            _setLogoInfo(value);
        }
    });
    return { logoInfo, setLogoInfo };
};
//# sourceMappingURL=logo.js.map
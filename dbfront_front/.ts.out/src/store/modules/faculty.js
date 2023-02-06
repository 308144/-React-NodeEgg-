import { useState } from 'react';
import { useMemoizedFn } from '@/hooks';
export default () => {
    const [facultyInfo, _setFacultyInfo] = useState();
    const setFacultyInfo = useMemoizedFn(value => {
        if (typeof value === 'function') {
            _setFacultyInfo(value(facultyInfo));
        }
        else {
            _setFacultyInfo(value);
        }
    });
    return { facultyInfo, setFacultyInfo };
};
//# sourceMappingURL=faculty.js.map
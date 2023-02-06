export function convertListDataToProTable(res) {
    const output = {
        current: 1,
        data: [],
        pageSize: '20',
        success: false,
        total: 0,
    };
    if (res.code === 0) {
        const { data } = res;
        if (!data) {
            return output;
        }
        Object.assign(output, {
            success: true,
            data: data.records,
            current: data.current,
            pageSize: data.size,
            total: data.total,
        });
    }
    return output;
}
export function DpGo(path) {
    window.location.hash = `${path}$`;
}
export function selectFile(accept, callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = `${accept}`;
    input.click();
    input.onchange = () => {
        if (input.files) {
            const file = input.files[0];
            callback(file);
        }
    };
}
const Iphone_reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
export const phoneRules = {
    phoneExtensionsData: [
        {
            require: true,
            validator(_, value) {
                if (value === undefined || value === '' || !isNaN(Number(value)) === false) {
                    return Promise.reject(new Error(`请输入手机号`));
                }
                else if (!Iphone_reg.test(value)) {
                    return Promise.reject(new Error(`请输入正确手机号`));
                }
                else {
                    return Promise.resolve();
                }
            },
        },
    ],
};
//# sourceMappingURL=tools.js.map
import createStore from './createStore';
import logo from './modules/logo';
import user from './modules/user';
import faculty from './modules/faculty';
const store = createStore(() => ({
    user: user(),
    logo: logo(),
    faculty: faculty()
}));
export const { useModel, StoreProvider, getModel, connectModel } = store;
//# sourceMappingURL=index.js.map
/** 1. 引入createStore.ts */
import createStore from './createStore'
import logo from './modules/logo'
import user from './modules/user'
import faculty from './modules/faculty'

/** 3. 组合所有状态 */
const store = createStore(() => ({
  user: user(),
  logo: logo(),
  faculty:faculty()
}))

/** 向外暴露useModel, StoreProvider, getModel, connectModel */
export const { useModel, StoreProvider, getModel, connectModel } = store

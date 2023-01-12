import { useState } from 'react'

import { LocalStorage } from '@/common/localStorage'
import { useMemoizedFn } from '@/hooks'

export interface IUserInfo {
  name: string
  userId: number
}

const userInfoStorage = new LocalStorage<IUserInfo>('user', {})

export default () => {
  const [userInfo, _setUserInfo] = useState<IUserInfo>(userInfoStorage.getItem())

  const setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>> = useMemoizedFn(value => {
    if (typeof value === 'function') {
      _setUserInfo(value(userInfo))
      userInfoStorage.setItem(value(userInfo))
    } else {
      userInfoStorage.setItem(value)
      _setUserInfo(value)
    }
  })
  return { userInfo, setUserInfo }
}

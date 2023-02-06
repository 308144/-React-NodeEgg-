import { useState } from 'react'

import { useMemoizedFn } from '@/hooks'



export default () => {
  const [facultyInfo, _setFacultyInfo] = useState<string[]>()

  const setFacultyInfo: React.Dispatch<React.SetStateAction<string[]>> = useMemoizedFn(value => {
    if (typeof value === 'function') {
      _setFacultyInfo(value(facultyInfo))
    } else {
      _setFacultyInfo(value)
    }
  })
  return { facultyInfo, setFacultyInfo }
}

import React from 'react'

import { Route } from './index'

import { ErrorBoundary, NotFound } from '@/components'

export default [
  {
    name: '404页面',
    path: '/404',
    hideInMenu: true,
    element: ErrorBoundary(() => <NotFound type={404} />),
  },
] as Route[]

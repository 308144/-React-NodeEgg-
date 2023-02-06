import React from 'react';
import { ErrorBoundary, NotFound } from '@/components';
export default [
    {
        name: '404页面',
        path: '/404',
        hideInMenu: true,
        element: ErrorBoundary(() => React.createElement(NotFound, { type: 404 })),
    },
];
//# sourceMappingURL=error.js.map
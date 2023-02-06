import demoRoutes from './demo';
import errorRoutes from './error';
import userRoutes from './user';
import { ErrorBoundary } from '@/components';
import HomePage from '@/pages/Home';
const indexRoutes = [{ path: '/home', name: '欢迎', element: ErrorBoundary(HomePage) }];
export const routes = [...indexRoutes,
    ...userRoutes,
    ...demoRoutes,
    ...errorRoutes
];
//# sourceMappingURL=index.js.map
import { Spin } from 'antd';
import React, { PureComponent } from 'react';
import NotFound from './NotFound';
let lastKey;
class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            message: '页面出现异常',
            loading: false,
        };
    }
    componentDidUpdate() {
        const key = this._reactInternals?.key;
        if (key !== lastKey) {
            this.setState({ hasError: false, message: '页面出现异常' });
            lastKey = key;
        }
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error) {
        if (error.message === '页面参数异常') {
            this.setState({ message: error.message });
        }
        else {
            this.setState({ message: '页面出现异常' });
        }
    }
    onRefresh = () => {
        this.setState({
            loading: true,
        }, () => {
            setTimeout(() => {
                this.setState({ hasError: false, message: '页面出现异常', loading: false });
            }, 300);
        });
    };
    render() {
        const { children } = this.props;
        const { hasError, message, loading } = this.state;
        return (React.createElement(React.Fragment, null, hasError ? (React.createElement(Spin, { spinning: loading },
            React.createElement(NotFound, { type: 500, message: message, onRefresh: this.onRefresh }))) : (children)));
    }
}
export default (Component) => {
    return (React.createElement(ErrorBoundary, { key: Math.random() },
        React.createElement(Component, null)));
};
//# sourceMappingURL=index.js.map
import { Spin } from 'antd'
import React, { FunctionComponent, PureComponent } from 'react'

import NotFound from './NotFound'

interface ErrorBoundaryProps {
  children: React.ReactNode
}
interface ErrorBoundaryState {
  hasError: boolean
  message: string
  loading: boolean
}

let lastKey: number
class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      message: '页面出现异常',
      loading: false,
    }
  }

  componentDidUpdate(): void {
    // @ts-ignore
    const key = this._reactInternals?.key
    if (key !== lastKey) {
      this.setState({ hasError: false, message: '页面出现异常' })
      lastKey = key
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error): void {
    if (error.message === '页面参数异常') {
      this.setState({ message: error.message })
    } else {
      this.setState({ message: '页面出现异常' })
    }
  }

  onRefresh = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        setTimeout(() => {
          this.setState({ hasError: false, message: '页面出现异常', loading: false })
        }, 300)
      },
    )
  }

  render() {
    const { children } = this.props
    const { hasError, message, loading } = this.state
    return (
      <>
        {hasError ? (
          <Spin spinning={loading}>
            <NotFound type={500} message={message} onRefresh={this.onRefresh} />
          </Spin>
        ) : (
          children
        )}
      </>
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (Component: FunctionComponent<any>) => {
  return (
    <ErrorBoundary key={Math.random()}>
      <Component />
    </ErrorBoundary>
  )
}

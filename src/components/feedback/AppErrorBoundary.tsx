import { Component, type ErrorInfo, type ReactNode } from 'react';

import { ErrorState } from '@/components/status/ErrorState';
import { LoggerProvider } from '@/lib/logging/logger';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true } satisfies AppErrorBoundaryState;
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled error', error, info);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <LoggerProvider>
          <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <ErrorState
              title="The executive workspace is temporarily unavailable"
              description="We captured the error and notified the engineering team. Please try again."
              onRetry={this.handleRetry}
            />
          </div>
        </LoggerProvider>
      );
    }

    return this.props.children;
  }
}

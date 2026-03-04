import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-12 rounded-xl
            border dark:border-red-900/40 border-red-200
            dark:bg-red-950/20 bg-red-50 gap-4 text-center">
            <div className="p-3 rounded-full dark:bg-red-900/40 bg-red-100">
              <AlertTriangle className="w-6 h-6 dark:text-red-400 text-red-600" />
            </div>
            <div>
              <h3 className="font-display font-semibold dark:text-red-300 text-red-700 mb-1">
                Something went wrong
              </h3>
              <p className="text-sm dark:text-red-400/80 text-red-600/80 font-mono max-w-md">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                dark:bg-red-900/40 bg-red-100 dark:text-red-300 text-red-700
                hover:dark:bg-red-900/60 hover:bg-red-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
}

export const InlineError: React.FC<InlineErrorProps> = ({ message, onRetry }) => (
  <div className="flex items-center justify-between p-4 rounded-lg
    border dark:border-red-900/40 border-red-200
    dark:bg-red-950/20 bg-red-50">
    <div className="flex items-center gap-3">
      <AlertTriangle className="w-4 h-4 dark:text-red-400 text-red-600 flex-shrink-0" />
      <span className="text-sm dark:text-red-300 text-red-700 font-mono">{message}</span>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
          dark:bg-red-900/40 bg-red-100 dark:text-red-300 text-red-700
          hover:dark:bg-red-900/60 hover:bg-red-200 transition-colors ml-4 flex-shrink-0"
      >
        <RefreshCw className="w-3 h-3" />
        Retry
      </button>
    )}
  </div>
);

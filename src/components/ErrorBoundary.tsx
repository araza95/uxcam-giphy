import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="text-destructive text-center p-4 rounded-md bg-card/50 max-w-xl mx-auto">
          <h2 className="text-lg font-medium mb-2">Something went wrong</h2>
          <p className="text-sm">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm text-accent hover:text-accent-foreground"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
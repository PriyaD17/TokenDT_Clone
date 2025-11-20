import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  props: Props;
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 m-4 bg-[#13141b] border border-red-900/50 rounded-lg flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 className="text-lg font-bold text-red-400 mb-1">Component Error</h2>
          <p className="text-xs text-gray-500 max-w-xs">Something went wrong while rendering this section.</p>
          <button 
            className="mt-4 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded transition-colors"
            onClick={() => this.setState({ hasError: false, error: undefined })} // Reset error state
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

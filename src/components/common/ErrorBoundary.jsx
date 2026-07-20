import React from 'react';
import AlertBanner from './AlertBanner';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center bg-surface border border-border rounded-lg max-w-2xl mx-auto my-8 space-y-4">
          <AlertBanner
            type="error"
            title="Syllabus Audit Interface Error"
            message="Something went wrong while rendering this section. Institutional logs remain safe in LocalStorage."
            dismissible={false}
          />
          <div className="text-xs text-text-tertiary">
            Error details: <span className="font-mono text-error">{this.state.error?.message || 'Unknown render error'}</span>
          </div>
          <Button variant="secondary" onClick={this.handleReset}>
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary component to catch and handle React errors gracefully.
 * 
 * @component
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details in development
    if (import.meta.env.DEV) {
      console.error('Error caught by ErrorBoundary:', error);
      console.error('Error info:', errorInfo);
    }
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: 'var(--theme-background)',
          color: 'var(--theme-text-primary)'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'var(--theme-surface)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--theme-border)'
          }}>
            <h1 style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: 'var(--theme-error)'
            }}>
              ⚠️ Something went wrong
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              color: 'var(--theme-text-secondary)',
              lineHeight: '1.6'
            }}>
              We encountered an unexpected error. Don&apos;t worry, your data is safe.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details style={{
                marginBottom: '2rem',
                textAlign: 'left',
                padding: '1rem',
                backgroundColor: 'var(--theme-background-secondary)',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{
                  overflow: 'auto',
                  padding: '1rem',
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  borderRadius: '4px',
                  fontSize: '0.85rem'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: 'var(--theme-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--theme-primary-hover)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'var(--theme-primary)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--theme-text-primary)',
                  backgroundColor: 'transparent',
                  border: '2px solid var(--theme-border)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = 'var(--theme-primary)';
                  e.target.style.color = 'var(--theme-primary)';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = 'var(--theme-border)';
                  e.target.style.color = 'var(--theme-text-primary)';
                }}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;


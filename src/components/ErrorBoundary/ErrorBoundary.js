import React, { Component } from 'react';
import ErrorPage from "../../components/UI/Result/ErrorPage/ErrorPage";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
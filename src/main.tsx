import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { TRPCProvider } from '@/providers/trpc'
import App from './App'
import './index.css'

// Error boundary to catch rendering errors in production
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('React error:', error, info)
    // Display error on page for debugging
    const el = document.getElementById('root')
    if (el) {
      el.innerHTML = `<div style="padding:20px;background:#000;color:#f00;font-family:monospace;white-space:pre-wrap;"><h2>React Render Error</h2><p>${error.message}</p><p>${error.stack}</p></div>`
    }
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 20, background: '#000', color: '#f00', fontFamily: 'monospace' }}>
        <h2>Render Error: {this.state.error?.message}</h2>
        <pre>{this.state.error?.stack}</pre>
      </div>
    }
    return this.props.children
  }
}

import React from 'react'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TRPCProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </TRPCProvider>
  </BrowserRouter>
)

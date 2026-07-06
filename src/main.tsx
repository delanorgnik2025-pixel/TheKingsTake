import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { TRPCProvider } from '@/providers/trpc'
import App from './App'
import './index.css'

// Global error handlers to catch and display runtime errors
window.onerror = function(message, source, lineno, colno, error) {
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `
      <div style="padding: 40px; font-family: monospace; background: #0a0f1a; color: #F0EBE1; min-height: 100vh;">
        <h2 style="color: #FF9500;">Runtime Error Caught</h2>
        <pre style="background: rgba(255,0,0,0.1); padding: 20px; border-radius: 8px; overflow: auto; color: #ff4444;">
${String(message)}
 at ${source}:${lineno}:${colno}

${error?.stack || 'No stack trace'}
        </pre>
      </div>
    `
  }
  console.error('[GLOBAL ERROR]', message, source, lineno, colno, error)
  return true
}

window.addEventListener('unhandledrejection', function(event) {
  const root = document.getElementById('root')
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `
      <div style="padding: 40px; font-family: monospace; background: #0a0f1a; color: #F0EBE1; min-height: 100vh;">
        <h2 style="color: #FF9500;">Unhandled Promise Rejection</h2>
        <pre style="background: rgba(255,0,0,0.1); padding: 20px; border-radius: 8px; overflow: auto; color: #ff4444;">
${String(event.reason)}

${event.reason?.stack || 'No stack trace'}
        </pre>
      </div>
    `
  }
  console.error('[UNHANDLED REJECTION]', event.reason)
})

try {
  const rootEl = document.getElementById('root')
  if (!rootEl) {
    throw new Error('Root element #root not found in DOM')
  }
  console.log('[BOOT] Creating React root...')
  const root = createRoot(rootEl)
  console.log('[BOOT] React root created, rendering app...')
  root.render(
    <BrowserRouter>
      <TRPCProvider>
        <App />
      </TRPCProvider>
    </BrowserRouter>
  )
  console.log('[BOOT] Render called successfully')
} catch (err: any) {
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `
      <div style="padding: 40px; font-family: monospace; background: #0a0f1a; color: #F0EBE1; min-height: 100vh;">
        <h2 style="color: #FF9500;">Fatal Boot Error</h2>
        <pre style="background: rgba(255,0,0,0.1); padding: 20px; border-radius: 8px; overflow: auto; color: #ff4444;">
${err?.message || String(err)}

${err?.stack || 'No stack trace'}
        </pre>
      </div>
    `
  }
  console.error('[FATAL BOOT ERROR]', err)
}

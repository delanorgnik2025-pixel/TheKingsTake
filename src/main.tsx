import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { TRPCProvider } from '@/providers/trpc'

document.body.style.backgroundColor = '#0f0'
const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <BrowserRouter>
      <TRPCProvider>
        <div style={{ color: 'red', fontSize: '40px', padding: '50px' }}>TRPC WORKS</div>
      </TRPCProvider>
    </BrowserRouter>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { TRPCProvider } from '@/providers/trpc'
import { MemberProvider } from '@/providers/MemberProvider'
import App from './App'
import './index.css'

// v2.2 - Pre-order fix, audio prompt fix, voice auto-fly
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TRPCProvider>
        <MemberProvider>
          <App />
        </MemberProvider>
      </TRPCProvider>
    </BrowserRouter>
  </StrictMode>
)
// deploy trigger 1783537047

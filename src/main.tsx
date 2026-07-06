import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

document.body.style.backgroundColor = '#0f0'
const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <BrowserRouter>
      <div style={{ color: 'red', fontSize: '40px', padding: '50px' }}>ROUTER WORKS</div>
    </BrowserRouter>
  )
}

import { createRoot } from 'react-dom/client'

document.body.style.backgroundColor = '#0f0'
const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(<div style={{ color: 'red', fontSize: '40px', padding: '50px' }}>REACT WORKS</div>)
}

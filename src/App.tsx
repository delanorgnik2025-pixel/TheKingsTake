import { useLocation } from 'react-router'

export default function App() {
  const location = useLocation()
  return <div style={{ padding: '100px', color: 'red', fontSize: '40px' }}>APP WORKS: {location.pathname}</div>
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import { PeerProvider } from './contexts/PeerProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PeerProvider>
      <App/>
    </PeerProvider>
  </React.StrictMode>,
)

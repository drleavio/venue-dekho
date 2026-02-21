import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='527612530314-v1p6fiktlrlift458itd6ng1vi34t3ce.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)

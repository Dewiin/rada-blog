import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import ThemeProvider from './contexts/ThemeContext.tsx'
import UIProvider from './contexts/UIContext.tsx'
import './index.css'
import App from './App.tsx'

// Components
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <UIProvider>
          <Toaster />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UIProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/contexts/theme-context'
import { TenantProvider } from '@/contexts/tenant-context'
import { OrgProvider } from '@/contexts/org-context'
import { AuthProvider } from '@/contexts/auth-context'
import { ReloadPrompt } from '@/components/reload-prompt'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TenantProvider>
        <OrgProvider>
          <ThemeProvider defaultTheme="falcon" defaultMode="light">
            <App />
            <ReloadPrompt />
          </ThemeProvider>
        </OrgProvider>
      </TenantProvider>
    </AuthProvider>
  </StrictMode>,
)

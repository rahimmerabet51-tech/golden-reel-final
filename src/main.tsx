import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // تأكد بلي عندك ملف index.css
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// نكريو "البطارية" (Client)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* نغلفو التطبيق بالبطارية باش يمشي */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
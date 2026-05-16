import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './features/app/store.ts'
import AuthInitializer from './features/auth/AuthInitializer.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthInitializer>
          <App />
          <ToastContainer theme="dark" position="top-right" />
        </AuthInitializer>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

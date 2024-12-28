import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Pages/Home'
import MainLayout from './Layouts/MainLayout'
import Cart from './Pages/Cart'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
)

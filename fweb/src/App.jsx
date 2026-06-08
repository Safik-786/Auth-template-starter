import React from 'react'
import AuthRoutes from './modules/auth/AuthRoutes'

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <AuthRoutes />
    </div>
  )
}

export default App
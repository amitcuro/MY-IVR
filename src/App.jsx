import { useState } from 'react'
import './App.css'
import IVRPhone from './components/IVRPhone'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <IVRPhone />
      </div>
    </ErrorBoundary>
  )
}

export default App

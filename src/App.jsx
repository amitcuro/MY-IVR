import { useState } from 'react'
import './App.css'
import IVRPhone from './components/IVRPhone'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <IVRPhone />
    </div>
  )
}

export default App

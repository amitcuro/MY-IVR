import { useState } from 'react'
import IVRMenu from './IVRMenu'
import IVRCall from './IVRCall'

export default function IVRSystem() {
  const [inCall, setInCall] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('main')
  const [callHistory, setCallHistory] = useState([])

  const handleStartCall = (menuPath) => {
    setInCall(true)
    setCurrentMenu(menuPath)
  }

  const handleEndCall = () => {
    setInCall(false)
    setCurrentMenu('main')
    setCallHistory([...callHistory, new Date().toLocaleString()])
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {!inCall ? (
          <IVRMenu onStartCall={handleStartCall} callHistory={callHistory} />
        ) : (
          <IVRCall 
            currentMenu={currentMenu} 
            onEndCall={handleEndCall}
            onNavigate={setCurrentMenu}
          />
        )}
      </div>
    </div>
  )
}

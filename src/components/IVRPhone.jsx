import { useState } from 'react'

export default function IVRPhone() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [inCall, setInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [callLog, setCallLog] = useState([])
  const [callTimer, setCallTimer] = useState(null)

  const menuOptions = {
    main: {
      title: 'Main Menu',
      options: [
        { key: '1', label: 'Billing', icon: '💳' },
        { key: '2', label: 'Support', icon: '🆘' },
        { key: '3', label: 'Sales', icon: '🛍️' },
        { key: '0', label: 'Operator', icon: '👤' }
      ]
    },
    billing: {
      title: 'Billing Menu',
      options: [
        { key: '1', label: 'View Bill', icon: '📄' },
        { key: '2', label: 'Make Payment', icon: '💰' },
        { key: '3', label: 'Payment History', icon: '📊' },
        { key: '*', label: 'Go Back', icon: '↩️' }
      ]
    },
    support: {
      title: 'Support Menu',
      options: [
        { key: '1', label: 'Internet Issues', icon: '🌐' },
        { key: '2', label: 'Email Setup', icon: '✉️' },
        { key: '3', label: 'Hardware Help', icon: '🖥️' },
        { key: '*', label: 'Go Back', icon: '↩️' }
      ]
    },
    sales: {
      title: 'Sales Menu',
      options: [
        { key: '1', label: 'New Plans', icon: '📱' },
        { key: '2', label: 'Special Offers', icon: '🎁' },
        { key: '3', label: 'Upgrade', icon: '⬆️' },
        { key: '*', label: 'Go Back', icon: '↩️' }
      ]
    }
  }

  const handleDial = (number) => {
    if (!inCall) {
      setPhoneNumber(prev => (prev + number).slice(0, 15))
    }
  }

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1))
  }

  const handleCall = () => {
    if (phoneNumber.trim()) {
      setInCall(true)
      setSelectedMenu('main')
      setCallDuration(0)
      
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)

      setCallTimer(interval)
    }
  }

  const handleEndCall = () => {
    if (callTimer) clearInterval(callTimer)
    setInCall(false)
    setSelectedMenu(null)
    setCallLog([...callLog, { number: phoneNumber, duration: callDuration, time: new Date().toLocaleTimeString() }])
    setPhoneNumber('')
    setCallDuration(0)
    setCallTimer(null)
  }

  const handleMenuSelect = (key, menuKey) => {
    if (key === '*') {
      setSelectedMenu('main')
    } else if (key === '0') {
      handleEndCall()
    } else {
      const selectedOption = menuOptions[menuKey].options.find(o => o.key === key)
      if (selectedOption) {
        alert(`✓ Selected: ${selectedOption.label}`)
      }
    }
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentMenu = menuOptions[selectedMenu]

  return (
    <div className="w-full max-w-lg px-4">
      {/* Phone Container */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-3xl border-8 border-gray-900 overflow-hidden shadow-2xl">
        {/* Notch */}
        <div className="h-6 bg-black rounded-b-3xl mx-auto w-2/3"></div>

        {/* Screen */}
        <div className="bg-gradient-to-b from-blue-950 to-slate-900 p-4 sm:p-6 min-h-96 sm:min-h-[500px] flex flex-col">
          {inCall && currentMenu ? (
            <>
              {/* Call Status */}
              <div className="text-center mb-6 pb-4 border-b border-blue-700">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="animate-pulse">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <p className="text-white font-semibold text-sm sm:text-base">In Active Call</p>
                </div>
                <p className="text-green-400 text-xl sm:text-2xl font-mono font-bold">{formatDuration(callDuration)}</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">{phoneNumber}</p>
              </div>

              {/* Menu Title */}
              <h3 className="text-white font-bold text-center mb-4 text-base sm:text-lg">{currentMenu.title}</h3>

              {/* Menu Options */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
                {currentMenu.options.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleMenuSelect(option.key, selectedMenu)}
                    className="bg-gradient-to-br from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white p-3 sm:p-4 rounded-lg text-sm sm:text-base font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-between"
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <div className="text-right">
                      <div className="text-xs opacity-75">Press {option.key}</div>
                      <div>{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* End Call Button */}
              <button
                onClick={handleEndCall}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 sm:py-4 rounded-lg text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95"
              >
                📞 End Call
              </button>
            </>
          ) : (
            <>
              {/* Idle Mode */}
              <p className="text-gray-400 text-xs sm:text-sm mb-3 uppercase tracking-wider">Enter Phone Number</p>
              
              {/* Display */}
              <div className="bg-gradient-to-r from-blue-950 to-slate-900 border-2 border-blue-700 rounded-lg p-4 sm:p-6 mb-6 min-h-24 flex items-center justify-center">
                <p className="text-green-400 text-3xl sm:text-4xl font-mono font-bold tracking-widest">
                  {phoneNumber || '---'}
                </p>
              </div>

              {/* Call Log */}
              {callLog.length > 0 && (
                <div className="bg-blue-950 bg-opacity-60 rounded-lg p-3 sm:p-4 mb-4 border border-blue-800">
                  <p className="font-bold text-white text-xs sm:text-sm mb-2">📞 Recent Calls:</p>
                  <div className="space-y-1 max-h-20 sm:max-h-28 overflow-y-auto">
                    {callLog.slice(-5).reverse().map((log, idx) => (
                      <div key={idx} className="text-xs sm:text-sm text-gray-300 flex justify-between">
                        <span className="text-green-400 font-mono">{log.number}</span>
                        <span className="text-yellow-400">{formatDuration(log.duration)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call Button */}
              <button
                onClick={handleCall}
                disabled={!phoneNumber.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 sm:py-4 rounded-lg text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95 disabled:scale-100"
              >
                📞 Call
              </button>
            </>
          )}
        </div>

        {/* Keypad */}
        <div className="bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6">
          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {[
              { num: '1', letters: '' },
              { num: '2', letters: 'ABC' },
              { num: '3', letters: 'DEF' },
              { num: '4', letters: 'GHI' },
              { num: '5', letters: 'JKL' },
              { num: '6', letters: 'MNO' },
              { num: '7', letters: 'PQRS' },
              { num: '8', letters: 'TUV' },
              { num: '9', letters: 'WXYZ' }
            ].map(({ num, letters }) => (
              <button
                key={num}
                onClick={() => handleDial(num)}
                disabled={inCall}
                className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 text-white font-bold py-3 sm:py-4 rounded-lg text-lg sm:text-2xl transition-all transform hover:scale-110 active:scale-95 disabled:scale-100 flex flex-col items-center"
              >
                <span>{num}</span>
                <span className="text-xs opacity-60">{letters}</span>
              </button>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            <button
              onClick={() => handleDial('*')}
              disabled={inCall}
              className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 text-white font-bold py-3 sm:py-4 rounded-lg text-lg sm:text-2xl transition-all transform hover:scale-110 active:scale-95 disabled:scale-100"
            >
              *
            </button>
            <button
              onClick={() => handleDial('0')}
              disabled={inCall}
              className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 text-white font-bold py-3 sm:py-4 rounded-lg text-lg sm:text-2xl transition-all transform hover:scale-110 active:scale-95 disabled:scale-100"
            >
              0
            </button>
            <button
              onClick={() => handleDial('#')}
              disabled={inCall}
              className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 text-white font-bold py-3 sm:py-4 rounded-lg text-lg sm:text-2xl transition-all transform hover:scale-110 active:scale-95 disabled:scale-100"
            >
              #
            </button>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              onClick={handleBackspace}
              disabled={inCall || phoneNumber.length === 0}
              className="bg-gradient-to-br from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold py-2 sm:py-3 rounded-lg text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95"
            >
              ← Delete
            </button>
            <button
              onClick={() => {
                setPhoneNumber('')
                setCallLog([])
              }}
              disabled={inCall}
              className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-800 disabled:to-gray-900 text-white font-bold py-2 sm:py-3 rounded-lg text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Status Info */}
      <div className="mt-6 text-center text-gray-400 text-xs sm:text-sm">
        <p>IVR Calling System v1.0</p>
        <p className="text-gray-600 mt-1">Responsive Design • Touch Friendly</p>
      </div>
    </div>
  )
}


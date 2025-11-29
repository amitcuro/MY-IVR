import { useState } from 'react'

const menuStructure = {
  billing: {
    title: 'Billing & Payments',
    description: 'Manage your billing and payments',
    options: [
      { key: '1', label: 'View Bill', action: 'view' },
      { key: '2', label: 'Make Payment', action: 'payment' },
      { key: '3', label: 'Payment History', action: 'history' },
      { key: '*', label: 'Go Back', action: 'back' }
    ]
  },
  support: {
    title: 'Technical Support',
    description: 'Get help with technical issues',
    options: [
      { key: '1', label: 'Internet Issues', action: 'internet' },
      { key: '2', label: 'Email Support', action: 'email' },
      { key: '3', label: 'Hardware Issues', action: 'hardware' },
      { key: '*', label: 'Go Back', action: 'back' }
    ]
  },
  sales: {
    title: 'Sales & Offers',
    description: 'Explore our latest offers',
    options: [
      { key: '1', label: 'New Plans', action: 'plans' },
      { key: '2', label: 'Special Offers', action: 'offers' },
      { key: '3', label: 'Upgrade Service', action: 'upgrade' },
      { key: '*', label: 'Go Back', action: 'back' }
    ]
  },
  status: {
    title: 'Order Status',
    description: 'Check your order status',
    options: [
      { key: '1', label: 'Track Order', action: 'track' },
      { key: '2', label: 'Return Status', action: 'return' },
      { key: '3', label: 'Delivery Updates', action: 'delivery' },
      { key: '*', label: 'Go Back', action: 'back' }
    ]
  },
  feedback: {
    title: 'Feedback',
    description: 'Share your feedback with us',
    options: [
      { key: '1', label: 'Rate Service', action: 'rate' },
      { key: '2', label: 'Report Issue', action: 'report' },
      { key: '3', label: 'Submit Suggestion', action: 'suggest' },
      { key: '*', label: 'Go Back', action: 'back' }
    ]
  }
}

const actionMessages = {
  view: 'Your current bill is $99.99. Total due: 30 days.',
  payment: 'Please enter your payment amount or say your preferred payment method.',
  history: 'Last 3 payments: $99.99, $99.99, $99.99',
  internet: 'Troubleshooting internet connection...',
  email: 'Opening email support chat...',
  hardware: 'Connecting to hardware specialist...',
  plans: 'Our plans range from $29.99 to $199.99 per month.',
  offers: 'Get 50% off your first 3 months!',
  upgrade: 'Upgrading your service...',
  track: 'Your order will arrive in 2-3 business days.',
  return: 'Return initiated. You will receive a label shortly.',
  delivery: 'Your package is out for delivery today.',
  rate: 'Please rate our service on a scale of 1-5.',
  report: 'Reporting your issue to our team...',
  suggest: 'Thank you for your suggestion. We value your input.'
}

export default function IVRCall({ currentMenu, onEndCall, onNavigate }) {
  const [selectedAction, setSelectedAction] = useState(null)
  const [showMessage, setShowMessage] = useState(false)

  const menu = menuStructure[currentMenu]
  if (!menu) {
    onEndCall()
    return null
  }

  const handleOption = (option) => {
    if (option.action === 'back') {
      onNavigate('main')
    } else {
      setSelectedAction(option.action)
      setShowMessage(true)
    }
  }

  const handleClearMessage = () => {
    setShowMessage(false)
    setSelectedAction(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
      {/* Active Call Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{menu.title}</h2>
            <p className="text-red-100 text-sm mt-1">🔴 In Call</p>
          </div>
          <button
            onClick={onEndCall}
            className="bg-red-700 hover:bg-red-800 px-6 py-2 rounded-full font-semibold transition"
          >
            ✕ End Call
          </button>
        </div>
      </div>

      {/* Menu Content */}
      <div className="p-8">
        {!showMessage ? (
          <>
            <p className="text-gray-700 mb-6">{menu.description}</p>
            <div className="space-y-3">
              {menu.options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleOption(option)}
                  className="w-full flex items-center justify-between bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg p-4 transition"
                >
                  <span className="text-lg font-semibold text-gray-800">{option.label}</span>
                  <span className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {option.key}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-gray-800 font-semibold mb-2">System Message:</p>
              <p className="text-gray-700">{actionMessages[selectedAction]}</p>
            </div>
            <button
              onClick={handleClearMessage}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              Continue
            </button>
          </div>
        )}
      </div>

      {/* Call Info */}
      <div className="bg-gray-100 px-6 py-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Call Duration: 00:02</span>
          <span>Press * to go back</span>
        </div>
      </div>
    </div>
  )
}

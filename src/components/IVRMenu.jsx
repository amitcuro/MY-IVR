export default function IVRMenu({ onStartCall, callHistory }) {
  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
        <h1 className="text-4xl font-bold mb-2">IVR System</h1>
        <p className="text-blue-100">Interactive Voice Response</p>
      </div>

      {/* Main Menu */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome to our IVR System</h2>
        <p className="text-gray-600 mb-8">Please select an option to start:</p>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => onStartCall('billing')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            <span className="text-lg">📞 Press 1 - Billing & Payments</span>
          </button>

          <button
            onClick={() => onStartCall('support')}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            <span className="text-lg">📞 Press 2 - Technical Support</span>
          </button>

          <button
            onClick={() => onStartCall('sales')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            <span className="text-lg">📞 Press 3 - Sales & Offers</span>
          </button>

          <button
            onClick={() => onStartCall('status')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            <span className="text-lg">📞 Press 4 - Order Status</span>
          </button>

          <button
            onClick={() => onStartCall('feedback')}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            <span className="text-lg">📞 Press 5 - Feedback</span>
          </button>
        </div>

        {/* Call History */}
        {callHistory.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Calls</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {callHistory.slice(-5).reverse().map((call, idx) => (
                <div key={idx} className="flex items-center text-gray-600 text-sm mb-2">
                  <span className="text-green-500 mr-2">✓</span>
                  {call}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { TrendingUp, Package, DollarSign, BarChart2 } from 'lucide-react';

interface MarketTrend {
  crop: string;
  price: number;
  change: number;
  demand: 'High' | 'Medium' | 'Low';
}

export default function MarketPlace() {
  const marketTrends: MarketTrend[] = [
    { crop: 'Organic Wheat', price: 2400, change: 5.2, demand: 'High' },
    { crop: 'Soybeans', price: 3800, change: -2.1, demand: 'Medium' },
    { crop: 'Cotton', price: 6200, change: 8.4, demand: 'High' },
    { crop: 'Rice', price: 2800, change: 1.5, demand: 'Medium' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">Market Analysis</h2>
      </div>

      <div className="space-y-6">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Total Orders</span>
            </div>
            <p className="text-2xl font-bold">284</p>
            <p className="text-sm text-purple-600">↑ 12% from last month</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-medium">Revenue</span>
            </div>
            <p className="text-2xl font-bold">₹4.2L</p>
            <p className="text-sm text-green-600">↑ 8% from last month</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Active Buyers</span>
            </div>
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-blue-600">↑ 24% from last month</p>
          </div>
        </div>

        {/* Market Trends */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Crop</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price/Quintal</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Change</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Demand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {marketTrends.map((trend, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{trend.crop}</td>
                  <td className="px-4 py-3">₹{trend.price}</td>
                  <td className={`px-4 py-3 ${trend.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.change >= 0 ? '↑' : '↓'} {Math.abs(trend.change)}%
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      trend.demand === 'High' ? 'bg-green-100 text-green-800' :
                      trend.demand === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trend.demand}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
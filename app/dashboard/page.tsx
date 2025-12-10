'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Award, Leaf, Building2, DollarSign } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const emissionsData = [
  { month: 'Jan', co2: 120, nox: 45, sox: 30 },
  { month: 'Feb', co2: 115, nox: 42, sox: 28 },
  { month: 'Mar', co2: 125, nox: 48, sox: 32 },
  { month: 'Apr', co2: 110, nox: 40, sox: 27 },
  { month: 'May', co2: 105, nox: 38, sox: 25 },
  { month: 'Jun', co2: 100, nox: 35, sox: 23 },
]

const pollutantDistribution = [
  { name: 'CO₂', value: 650, color: '#ef4444' },
  { name: 'NOx', value: 248, color: '#f59e0b' },
  { name: 'SOx', value: 165, color: '#8b5cf6' },
  { name: 'PM', value: 87, color: '#06b6d4' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Carbon Audit Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Acme Industries Ltd.</span>
              <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                AI
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'emissions', 'credits', 'sac-rating'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'emissions' && <EmissionsTab />}
        {activeTab === 'credits' && <CreditsTab />}
        {activeTab === 'sac-rating' && <SACRatingTab />}
      </main>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          icon={<BarChart3 className="h-8 w-8 text-red-600" />}
          title="Total Emissions"
          value="1,150 tons"
          change="-8.2%"
          positive={true}
        />
        <StatCard
          icon={<DollarSign className="h-8 w-8 text-green-600" />}
          title="Carbon Credits"
          value="245"
          change="+12.5%"
          positive={true}
        />
        <StatCard
          icon={<Award className="h-8 w-8 text-blue-600" />}
          title="SAC Rating"
          value="B+"
          change="Improved"
          positive={true}
        />
        <StatCard
          icon={<Building2 className="h-8 w-8 text-purple-600" />}
          title="Compliance"
          value="92%"
          change="+5%"
          positive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emissions Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="co2" stroke="#ef4444" name="CO₂" />
              <Line type="monotone" dataKey="nox" stroke="#f59e0b" name="NOx" />
              <Line type="monotone" dataKey="sox" stroke="#8b5cf6" name="SOx" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pollutant Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pollutantDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pollutantDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function EmissionsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Emissions Breakdown</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={emissionsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="co2" fill="#ef4444" name="CO₂ (tons)" />
            <Bar dataKey="nox" fill="#f59e0b" name="NOx (tons)" />
            <Bar dataKey="sox" fill="#8b5cf6" name="SOx (tons)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Emission Record</h3>
        <form className="grid md:grid-cols-3 gap-4">
          <input type="date" className="border rounded-lg px-4 py-2" />
          <select className="border rounded-lg px-4 py-2">
            <option>Select Pollutant</option>
            <option>CO₂</option>
            <option>NOx</option>
            <option>SOx</option>
            <option>PM</option>
          </select>
          <input type="number" placeholder="Amount (tons)" className="border rounded-lg px-4 py-2" />
          <button type="submit" className="md:col-span-3 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Add Record
          </button>
        </form>
      </div>
    </div>
  )
}

function CreditsTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Carbon Credits</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">245 Credits</div>
          <p className="text-gray-600">Equivalent to 245 tons CO₂ offset</p>
          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full">
            Buy More Credits
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketplace</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Current Price</span>
              <span className="font-semibold">₹2,500/credit</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Available Credits</span>
              <span className="font-semibold">1,250</span>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full">
              Sell Your Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SACRatingTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your SAC Rating</h3>
        <div className="flex items-center space-x-6">
          <div className="text-6xl font-bold text-green-600">B+</div>
          <div className="flex-1">
            <div className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Overall Score</span>
                <span className="text-sm font-semibold">85/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <p className="text-gray-600">You're in the top 25% of MSMEs in Indore!</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-semibold text-gray-900 mb-2">Pollutant Knowledge</h4>
          <div className="text-3xl font-bold text-blue-600 mb-1">90%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-semibold text-gray-900 mb-2">Compliance</h4>
          <div className="text-3xl font-bold text-green-600 mb-1">92%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-semibold text-gray-900 mb-2">Reduction Efforts</h4>
          <div className="text-3xl font-bold text-purple-600 mb-1">75%</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Improve Your Rating</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Complete the advanced pollutant knowledge assessment</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Reduce CO₂ emissions by 10% in the next quarter</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">○</span>
            <span>Implement a waste reduction program</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, change, positive }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

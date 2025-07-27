import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Clock, MessageSquare, Heart, Calendar } from 'lucide-react';

const BehavioralPatterns = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const timeframes = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
  ];

  // Mock data for charts
  const generateMockData = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      sentiment: Math.random() * 100,
      activity: Math.random() * 100,
      posts: Math.floor(Math.random() * 10),
      sleep: 6 + Math.random() * 4,
    }));
  };

  const data = generateMockData(selectedTimeframe === '7d' ? 7 : selectedTimeframe === '30d' ? 30 : 90);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Behavioral Pattern Analysis</h2>
        <div className="flex bg-white rounded-lg border border-gray-200 p-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.id}
              onClick={() => setSelectedTimeframe(timeframe.id)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                selectedTimeframe === timeframe.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center text-red-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">-23%</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Post Frequency</h3>
          <p className="text-sm text-gray-600">Average 3.2 posts/day</p>
          <p className="text-xs text-red-600 mt-2">Significant decrease from baseline</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center text-yellow-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">-15%</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Sentiment Score</h3>
          <p className="text-sm text-gray-600">Current: 42/100</p>
          <p className="text-xs text-yellow-600 mt-2">Below personal average</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+8%</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Sleep Quality</h3>
          <p className="text-sm text-gray-600">Average 7.2 hours</p>
          <p className="text-xs text-green-600 mt-2">Slight improvement</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-1">
            {data.slice(0, 14).map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-sm transition-all duration-300 hover:from-blue-500 hover:to-blue-700"
                  style={{ height: `${item.sentiment * 2}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Negative</span>
            <span>Neutral</span>
            <span>Positive</span>
          </div>
        </div>

        {/* Activity Pattern */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity</h3>
          <div className="h-64 flex items-end justify-between space-x-1">
            {data.slice(0, 14).map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-purple-400 to-purple-600 rounded-t-sm transition-all duration-300 hover:from-purple-500 hover:to-purple-700"
                  style={{ height: `${item.activity * 2}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pattern Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Key Observations</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5"></div>
                <span>Posting frequency decreased significantly on weekends</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5"></div>
                <span>Sentiment scores lower during late evening hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5"></div>
                <span>Increased activity correlation with mood improvements</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5"></div>
                <span>Better sleep patterns in the last week</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-blue-500 mt-0.5" />
                <span>Consider scheduling social activities on weekends</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-purple-500 mt-0.5" />
                <span>Implement evening routine for better mood regulation</span>
              </li>
              <li className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-pink-500 mt-0.5" />
                <span>Continue current sleep optimization strategies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralPatterns;
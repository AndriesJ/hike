// components/TrailDetail.jsx
import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Mountain,
  Droplets,
  Award,
  X,
  Share2,
  Heart,
  Download,
  ChevronLeft,
  Navigation
} from 'lucide-react';

const TrailDetail = ({ trail, onClose, onSaveTrail, isSaved }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!trail) return null;

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-orange-100 text-orange-800',
    expert: 'bg-red-100 text-red-800'
  };

  const difficultyLevels = {
    easy: { icon: '🌱', label: 'Easy' },
    moderate: { icon: '🚶', label: 'Moderate' },
    hard: { icon: '⛰️', label: 'Hard' },
    expert: { icon: '⚡', label: 'Expert' }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 bg-gray-200">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
          <img
            src={trail.imageUrl || '/api/placeholder/800/400'}
            alt={trail.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onSaveTrail(trail)}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
          
          {/* Trail Name Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">{trail.name}</h2>
            <div className="flex items-center text-white/90">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{trail.location}</span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b px-4">
          <div className="flex space-x-4">
            {['overview', 'details', 'reviews', 'photos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-2 font-medium text-sm capitalize transition-colors relative ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Mountain className="w-4 h-4 mr-1" />
                    <span className="text-xs">Distance</span>
                  </div>
                  <span className="text-lg font-semibold">{trail.distance} km</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-xs">Duration</span>
                  </div>
                  <span className="text-lg font-semibold">{trail.duration}</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <span className="mr-1">📈</span>
                    <span className="text-xs">Elevation</span>
                  </div>
                  <span className="text-lg font-semibold">{trail.elevationGain} m</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Droplets className="w-4 h-4 mr-1" />
                    <span className="text-xs">Difficulty</span>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    difficultyColors[trail.difficulty]
                  }`}>
                    {difficultyLevels[trail.difficulty]?.label || trail.difficulty}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">About this trail</h3>
                <p className="text-gray-600 leading-relaxed">{trail.description}</p>
              </div>

              {/* Highlights */}
              {trail.highlights && trail.highlights.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {trail.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Start Navigation
                </button>
                <button className="flex-1 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Save Offline
                </button>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              {/* Trail Details */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">Trail Information</h3>
                <div className="space-y-3">
                  <DetailRow label="Route Type" value={trail.routeType || 'Loop'} />
                  <DetailRow label="Best Season" value={trail.bestSeason || 'Year-round'} />
                  <DetailRow label="Dog Friendly" value={trail.dogFriendly ? 'Yes' : 'No'} />
                  <DetailRow label="Campsites" value={trail.campsites || 'None'} />
                  <DetailRow label="Water Sources" value={trail.waterSources || 'Limited'} />
                  <DetailRow label="Cell Service" value={trail.cellService || 'Spotty'} />
                </div>
              </div>

              {/* Elevation Profile */}
              {trail.elevationProfile && (
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-3">Elevation Profile</h3>
                  <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Elevation chart placeholder</span>
                  </div>
                </div>
              )}

              {/* Trail Conditions */}
              <div>
                <h3 className="font-semibold mb-3">Current Conditions</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    Trail is clear and well-maintained. Some muddy sections after recent rain.
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">Updated 2 hours ago</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Rating Summary */}
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-3xl font-bold">{trail.rating || '4.5'}</span>
                  <span className="text-gray-500">/5</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      {i < Math.floor(trail.rating || 4.5) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-gray-500">{trail.reviewCount || 128} reviews</span>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                <Review
                  author="Sarah M."
                  rating={5}
                  date="2 weeks ago"
                  comment="Absolutely stunning views! The trail was well marked and not too crowded."
                />
                <Review
                  author="Mike R."
                  rating={4}
                  date="1 month ago"
                  comment="Great hike, moderate difficulty. The waterfall at the midpoint is worth the trek!"
                />
                <Review
                  author="Jessica L."
                  rating={5}
                  date="2 months ago"
                  comment="One of my favorite trails in the area. Perfect for a day hike."
                />
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6].map((photo) => (
                <div key={photo} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`/api/placeholder/200/200`}
                    alt={`Trail photo ${photo}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Quick Actions */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Starting from</span>
              <span className="block text-xl font-bold">${trail.price || 'Free'}</span>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const Review = ({ author, rating, date, comment }) => (
  <div className="border-b pb-4 last:border-b-0">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium">{author}</span>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
    </div>
    <p className="text-gray-600 text-sm">{comment}</p>
  </div>
);

export default TrailDetail;
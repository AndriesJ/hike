// pages/TrailList.jsx or similar
import React, { useState } from 'react';
import TrailDetail from '../components/TrailDetail';

const TrailList = () => {
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [savedTrails, setSavedTrails] = useState([]);

  const trails = [
    {
      id: 1,
      name: "Mountain Ridge Trail",
      location: "Rocky Mountain National Park",
      distance: 8.5,
      duration: "4-5 hours",
      elevationGain: 650,
      difficulty: "moderate",
      description: "A scenic trail through pine forests with stunning mountain views. Perfect for day hiking with several viewpoints along the way.",
      highlights: ["Mountain Views", "Wildflowers", "Wildlife Spotting"],
      imageUrl: "/api/placeholder/800/400",
      routeType: "Loop",
      bestSeason: "Summer-Fall",
      dogFriendly: true,
      rating: 4.5,
      reviewCount: 128
    },
    // More trails...
  ];

  const handleTrailClick = (trail) => {
    setSelectedTrail(trail);
    // Optional: Update URL with trail ID for deep linking
    window.history.pushState({}, '', `?trail=${trail.id}`);
  };

  const handleCloseDetail = () => {
    setSelectedTrail(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleSaveTrail = (trail) => {
    if (savedTrails.find(t => t.id === trail.id)) {
      setSavedTrails(savedTrails.filter(t => t.id !== trail.id));
    } else {
      setSavedTrails([...savedTrails, trail]);
    }
  };

  const isTrailSaved = (trailId) => {
    return savedTrails.some(t => t.id === trailId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Trails</h1>
      
      <div className="grid gap-4">
        {trails.map(trail => (
          <div
            key={trail.id}
            onClick={() => handleTrailClick(trail)}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold">{trail.name}</h3>
            <p className="text-gray-600">{trail.location}</p>
            <p className="text-sm text-gray-500">{trail.distance} km • {trail.difficulty}</p>
          </div>
        ))}
      </div>

      {selectedTrail && (
        <TrailDetail
          trail={selectedTrail}
          onClose={handleCloseDetail}
          onSaveTrail={handleSaveTrail}
          isSaved={isTrailSaved(selectedTrail.id)}
        />
      )}
    </div>
  );
};

export default TrailList;
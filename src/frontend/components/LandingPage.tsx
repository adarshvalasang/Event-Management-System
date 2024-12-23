import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, CalendarIcon } from 'lucide-react';
import { Event, Attendee } from '../App';
import { createEvent, updateEvent, deleteEvent } from '../api/api';

// ... rest of the code remains the same

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-6 text-4xl font-bold text-indigo-800">Welcome to Event Management Web App</h1>
      <p className="mb-8 text-2xl text-gray-700">
       An Assignment by WEBKNOT
      </p>
      {/* <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
        {[
          {
            icon: Sparkles,
            title: 'Effortless Planning',
            description: 'Organize events with ease using our intuitive interface.',
          },
          {
            icon: Zap,
            title: 'Real-time Collaboration',
            description: 'Work seamlessly with your team in real-time.',
          },
          {
            icon: TrendingUp,
            title: 'Insightful Analytics',
            description: 'Make data-driven decisions with our powerful analytics.',
          },
        ].map((feature, index) => (
          <div key={index} className="p-6 transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-md hover:scale-105">
            <feature.icon className="w-12 h-12 mb-4 text-indigo-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-800">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div> */}
      <div className="p-8 text-white bg-indigo-700 rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Plan, manage, and execute events with ease.</h2>
        <p className="mb-6">
        Plan, manage, and run events effortlessly. From organizing schedules to tracking attendees, everything you need is in one place to make events simple and successful.
        </p>
        <button className="px-4 py-2 font-semibold text-indigo-700 transition-colors duration-200 bg-white rounded hover:bg-indigo-100">
          Start Free Trial
        </button>
      </div>
    </div>
  );
};

export default LandingPage;


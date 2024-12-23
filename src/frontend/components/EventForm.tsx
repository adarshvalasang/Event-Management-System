

import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, CalendarIcon } from 'lucide-react';
import { Event, Attendee } from '../App';
import { createEvent, updateEvent, deleteEvent } from '../api/api';

// ... rest of the code remains the same
interface EventFormProps {
  event?: Event;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
  attendees: Attendee[];
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onCancel, attendees }) => {
  const [name, setName] = useState(event?.name || '');
  const [description, setDescription] = useState(event?.description || '');
  const [location, setLocation] = useState(event?.location || '');
  const [date, setDate] = useState(event?.date || '');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>(event?.attendees || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !location || !date) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit({
      id: event?.id || Date.now().toString(),
      name,
      description,
      location,
      date,
      attendees: selectedAttendees,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold">{event ? 'Edit Event' : 'Add New Event'}</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-bold text-gray-700">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block mb-2 font-bold text-gray-700">
          Location:
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2 font-bold text-gray-700">
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">Attendees:</label>
        <div className="grid grid-cols-2 gap-2">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="flex items-center">
              <input
                type="checkbox"
                id={`attendee-${attendee.id}`}
                checked={selectedAttendees.includes(attendee.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAttendees([...selectedAttendees, attendee.id]);
                  } else {
                    setSelectedAttendees(selectedAttendees.filter((id) => id !== attendee.id));
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={`attendee-${attendee.id}`}>{attendee.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {event ? 'Update' : 'Add'} Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;





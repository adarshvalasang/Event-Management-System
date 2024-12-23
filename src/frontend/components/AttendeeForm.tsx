import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, CalendarIcon } from 'lucide-react';
import { Event, Attendee } from '../App';
import { createEvent, updateEvent, deleteEvent } from '../api/api';

// ... rest of the code remains the same
interface AttendeeFormProps {
  onSubmit: (attendee: Attendee) => void;
  onCancel: () => void;
}

const AttendeeForm: React.FC<AttendeeFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter a name');
      return;
    }
    onSubmit({
      id: Date.now().toString(),
      name,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold">Add New Attendee</h3>
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
          Add Attendee
        </button>
      </div>
    </form>
  );
};

export default AttendeeForm;



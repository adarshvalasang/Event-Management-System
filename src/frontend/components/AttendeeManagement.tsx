

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, User } from 'lucide-react';
import { Attendee, Event } from '../App';
import AttendeeForm from './AttendeeForm';
import { getAllAttendees, addAttendee, deleteAttendee } from '../api/api';

interface AttendeeManagementProps {
  attendees: Attendee[];
  setAttendees: React.Dispatch<React.SetStateAction<Attendee[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const AttendeeManagement: React.FC<AttendeeManagementProps> = ({
  attendees,
  setAttendees,
  events,
  setEvents,
}) => {
  const [isAddingAttendee, setIsAddingAttendee] = useState(false);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const fetchedAttendees = await getAllAttendees();
        setAttendees(fetchedAttendees);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    };

    fetchAttendees();
  }, [setAttendees]);

  const handleAddAttendee = async (newAttendee: Attendee) => {
    try {
      const addedAttendee = await addAttendee(newAttendee);
      setAttendees([...attendees, addedAttendee]);
      setIsAddingAttendee(false);
    } catch (error) {
      console.error('Error adding attendee:', error);
    }
  };

  const handleRemoveAttendee = async (attendeeId: string) => {
    try {
      await deleteAttendee(attendeeId);
      setAttendees(attendees.filter((attendee) => attendee.id !== attendeeId));
      setEvents(
        events.map((event) => ({
          ...event,
          attendees: event.attendees.filter((id) => id !== attendeeId),
        }))
      );
    } catch (error) {
      console.error('Error removing attendee:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-indigo-800">Attendee Management</h2>
        <button
          className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
          onClick={() => setIsAddingAttendee(true)}
        >
          <Plus className="mr-2" size={20} />
          Add Attendee
        </button>
      </div>
      {isAddingAttendee && (
        <AttendeeForm onSubmit={handleAddAttendee} onCancel={() => setIsAddingAttendee(false)} />
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {attendees.map((attendee) => (
          <div key={attendee.id} className="overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-md hover:scale-105">
            <div className="flex items-center p-4 text-white bg-indigo-600">
              <User className="mr-3" size={24} />
              <h3 className="text-xl font-semibold">{attendee.name}</h3>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <strong className="text-indigo-600">Assigned Events:</strong>
                <ul className="list-disc list-inside">
                  {events
                    .filter((event) => event.attendees.includes(attendee.id))
                    .map((event) => (
                      <li key={event.id} className="text-gray-600">{event.name}</li>
                    ))}
                </ul>
              </div>
              <button
                className="flex items-center px-3 py-1 text-white transition-colors duration-200 bg-red-500 rounded-md hover:bg-red-600"
                onClick={() => handleRemoveAttendee(attendee.id)}
              >
                <Trash2 className="mr-1" size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendeeManagement;


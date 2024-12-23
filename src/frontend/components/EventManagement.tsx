import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin, CalendarIcon } from 'lucide-react';
import { Event, Attendee } from '../App';
import EventForm from './EventForm';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../api/api';

interface EventManagementProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  attendees: Attendee[];
}

const EventManagement: React.FC<EventManagementProps> = ({ events, setEvents, attendees }) => {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [setEvents]);

  const handleAddEvent = async (newEvent: Event) => {
    try {
      const createdEvent = await createEvent(newEvent);
      setEvents([...events, createdEvent]);
      setIsAddingEvent(false);
      setError(null);
    } catch (err: any) {
      setError('Failed to add event. Please try again.');
      console.error('Error adding event:', err.response?.data || err.message);
    }
  };

  const handleUpdateEvent = async (updatedEvent: Event) => {
    try {
      const result = await updateEvent(updatedEvent.id, updatedEvent);
      setEvents(events.map((event) => (event.id === result.id ? result : event)));
      setEditingEvent(null);
      setError(null);
    } catch (err: any) {
      setError('Failed to update event. Please try again.');
      console.error('Error updating event:', err.response?.data || err.message);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
      setError(null);
    } catch (err: any) {
      setError('Failed to delete event. Please try again.');
      console.error('Error deleting event:', err.response?.data || err.message);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading events...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-indigo-800">Event Management</h2>
        <button
          className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
          onClick={() => setIsAddingEvent(true)}
        >
          <Plus className="mr-2" size={20} />
          Add Event
        </button>
      </div>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {isAddingEvent && (
        <EventForm
          onSubmit={handleAddEvent}
          onCancel={() => setIsAddingEvent(false)}
          attendees={attendees}
        />
      )}
      {editingEvent && (
        <EventForm
          event={editingEvent}
          onSubmit={handleUpdateEvent}
          onCancel={() => setEditingEvent(null)}
          attendees={attendees}
        />
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-md hover:scale-105">
            <div className="p-4 text-white bg-indigo-600">
              <h3 className="mb-2 text-xl font-semibold">{event.name}</h3>
              <p className="text-sm opacity-90">{event.description}</p>
            </div>
            <div className="p-4">
              <p className="flex items-center mb-2 text-gray-600">
                <MapPin className="mr-2" size={16} />
                {event.location}
              </p>
              <p className="flex items-center mb-4 text-gray-600">
                <CalendarIcon className="mr-2" size={16} />
                {new Date(event.date).toLocaleDateString()}
              </p>
              <div className="mb-4">
                <strong className="text-indigo-600">Attendees:</strong>
                <ul className="list-disc list-inside">
                  {event.attendees.map((attendeeId) => (
                    <li key={attendeeId} className="text-gray-600">
                      {attendees.find((a) => a.id === attendeeId)?.name || 'Unknown'}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="flex items-center px-3 py-1 text-white transition-colors duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                  onClick={() => setEditingEvent(event)}
                >
                  <Edit className="mr-1" size={16} />
                  Edit
                </button>
                <button
                  className="flex items-center px-3 py-1 text-white transition-colors duration-200 bg-red-500 rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="mr-1" size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;





import React, { useState } from 'react';
import { Task, Event, Attendee } from '../App';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  events: Event[];
  attendees: Attendee[];
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, events, attendees }) => {
  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [deadline, setDeadline] = useState(task?.deadline || '');
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Completed'>(task?.status || 'Pending');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || '');
  const [eventId, setEventId] = useState(task?.eventId || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: task?.id || Date.now().toString(),
      name,
      description,
      deadline,
      status,
      assignedTo,
      eventId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mb-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold">{task ? 'Edit Task' : 'Add New Task'}</h3>
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
        <label htmlFor="deadline" className="block mb-2 font-bold text-gray-700">
          Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          // value = {deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block mb-2 font-bold text-gray-700">
          Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Pending' | 'In Progress' | 'Completed')}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="assignedTo" className="block mb-2 font-bold text-gray-700">
          Assigned To:
        </label>
        <select
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select an attendee</option>
          {attendees.map((attendee) => (
            <option key={attendee.id} value={attendee.id}>
              {attendee.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="eventId" className="block mb-2 font-bold text-gray-700">
          Event:
        </label>
        <select
          id="eventId"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select an event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
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
          {task ? 'Update' : 'Add'} Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;


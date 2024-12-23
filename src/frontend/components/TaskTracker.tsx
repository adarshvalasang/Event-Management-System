



import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckSquare, Square, Clock, User, Calendar } from 'lucide-react';
import { Task, Event, Attendee } from '../App';
import TaskForm from './TaskForm';
import { createTask, getTasksForEvent, updateTaskStatus, deleteTask } from '../api/api';

interface TaskTrackerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  events: Event[];
  attendees: Attendee[];
}

const TaskTracker: React.FC<TaskTrackerProps> = ({ tasks, setTasks, events, attendees }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const allTasks = await Promise.all(events.map(event => getTasksForEvent(event.id)));
        setTasks(allTasks.flat());
        setError(null);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks, events]);

  const handleAddTask = async (newTask: Task) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setIsAddingTask(false);
      setError(null);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const result = await updateTaskStatus(updatedTask.id, updatedTask.status);
      setTasks(tasks.map(task => task.id === result.id ? result : task));
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-indigo-800">Task Tracker</h2>
        <button
          className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="mr-2" size={20} />
          Add Task
        </button>
      </div>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {isAddingTask && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setIsAddingTask(false)}
          events={events}
          attendees={attendees}
        />
      )}
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
          events={events}
          attendees={attendees}
        />
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div key={task.id} className="overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-md hover:scale-105">
            <div className={`p-4 ${task.status === 'Completed' ? 'bg-green-600' : task.status === 'In Progress' ? 'bg-yellow-600' : 'bg-red-600'} text-white`}>
              <h3 className="mb-2 text-xl font-semibold">{task.name}</h3>
              <span className="text-sm font-medium">{task.status}</span>
            </div>
            <div className="p-4">
              <p className="mb-2 text-gray-600">{task.description}</p>
              <p className="flex items-center mb-2 text-gray-600">
                <Clock className="mr-2" size={16} />
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>
              <p className="flex items-center mb-2 text-gray-600">
                <User className="mr-2" size={16} />
                Assigned to: {attendees.find((a) => a.id === task.assignedTo)?.name || 'Unknown'}
              </p>
              <p className="flex items-center mb-4 text-gray-600">
                <Calendar className="mr-2" size={16} />
                Event: {events.find((e) => e.id === task.eventId)?.name || 'Unknown'}
              </p>
              <div className="flex items-center justify-between">
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateTask({ ...task, status: e.target.value as 'Pending' | 'In Progress' | 'Completed' })}
                  className="px-2 py-1 leading-tight text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="space-x-2">
                  <button
                    className="flex items-center px-3 py-1 text-white transition-colors duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                    onClick={() => setEditingTask(task)}
                  >
                    <Edit className="mr-1" size={16} />
                    Edit
                  </button>
                  <button
                    className="flex items-center px-3 py-1 text-white transition-colors duration-200 bg-red-500 rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash2 className="mr-1" size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTracker;




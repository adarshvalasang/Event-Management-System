// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// // Event API calls
// export const createEvent = async (eventData: any) => {
//   const response = await axios.post(`${API_URL}/events`, eventData);
//   return response.data;
// };

// export const getAllEvents = async () => {
//   const response = await axios.get(`${API_URL}/events`);
//   return response.data;
// };

// export const updateEvent = async (id: string, eventData: any) => {
//   const response = await axios.put(`${API_URL}/events/${id}`, eventData);
//   return response.data;
// };

// export const deleteEvent = async (id: string) => {
//   const response = await axios.delete(`${API_URL}/events/${id}`);
//   return response.data;
// };

// // Attendee API calls
// export const addAttendee = async (attendeeData: any) => {
//   const response = await axios.post(`${API_URL}/attendees`, attendeeData);
//   return response.data;
// };

// export const getAllAttendees = async () => {
//   const response = await axios.get(`${API_URL}/attendees`);
//   return response.data;
// };

// export const deleteAttendee = async (id: string) => {
//   const response = await axios.delete(`${API_URL}/attendees/${id}`);
//   return response.data;
// };

// // Task API calls
// export const createTask = async (taskData: any) => {
//   const response = await axios.post(`${API_URL}/tasks`, taskData);
//   return response.data;
// };

// export const getTasksForEvent = async (eventId: string) => {
//   const response = await axios.get(`${API_URL}/tasks/event/${eventId}`);
//   return response.data;
// };

// export const updateTaskStatus = async (id: string, status: string) => {
//   const response = await axios.patch(`${API_URL}/tasks/${id}/status`, { status });
//   return response.data;
// };







// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// // Event API calls
// export const createEvent = async (eventData: any) => {
//   const response = await axios.post(`${API_URL}/events`, eventData);
//   return response.data;
// };

// export const getAllEvents = async () => {
//   const response = await axios.get(`${API_URL}/events`);
//   return response.data;
// };

// export const updateEvent = async (id: string, eventData: any) => {
//   const response = await axios.put(`${API_URL}/events/${id}`, eventData);
//   return response.data;
// };

// export const deleteEvent = async (id: string) => {
//   const response = await axios.delete(`${API_URL}/events/${id}`);
//   return response.data;
// };

// // Attendee API calls
// export const addAttendee = async (attendeeData: any) => {
//   const response = await axios.post(`${API_URL}/attendees`, attendeeData);
//   return response.data;
// };

// export const getAllAttendees = async () => {
//   const response = await axios.get(`${API_URL}/attendees`);
//   return response.data;
// };

// export const deleteAttendee = async (id: string) => {
//   const response = await axios.delete(`${API_URL}/attendees/${id}`);
//   return response.data;
// };

// // Task API calls
// export const createTask = async (taskData: any) => {
//   const response = await axios.post(`${API_URL}/tasks`, taskData);
//   return response.data;
// };

// export const getTasksForEvent = async (eventId: string) => {
//   const response = await axios.get(`${API_URL}/tasks/event/${eventId}`);
//   return response.data;
// };

// export const updateTaskStatus = async (id: string, status: string) => {
//   const response = await axios.patch(`${API_URL}/tasks/${id}/status`, { status });
//   return response.data;
// };
// export const deleteTask = async (id: string) => {
//   const response = await axios.delete(`${API_URL}/tasks/${id}`);
//   return response.data;
// };






// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// // Event API calls
// export const createEvent = async (eventData: any) => {
//   const response = await axios.post(`${API_URL}/events`, eventData);
//   return response.data;
// };

// export const getAllEvents = async () => {
//   const response = await axios.get(`${API_URL}/events`);
//   return response.data;
// };

// export const updateEvent = async (id: string, eventData: any) => {
//   const response = await axios.put(`${API_URL}/events/${id}`, eventData);
//   return response.data;
// };

// export const deleteEvent = async (id: string) => {
//   const response = await axios.delete(`${API_URL}/events/${id}`);
//   return response.data;
// };

// // Attendee API calls
// export const addAttendee = async (attendeeData: any) => {
//   const response = await axios.post(`${API_URL}/attendees`, attendeeData);
//   return response.data;
// };

// export const getAllAttendees = async () => {
//   const response = await axios.get(`${API_URL}/attendees`);
//   return response.data;
// };

// export const deleteAttendee = async (id: string) => {
//   const response = await axios.delete(`${API_URL}/attendees/${id}`);
//   return response.data;
// };

// // Task API calls
// export const createTask = async (taskData: any) => {
//   const response = await axios.post(`${API_URL}/tasks`, taskData);
//   return response.data;
// };

// export const getTasksForEvent = async (eventId: string) => {
//   const response = await axios.get(`${API_URL}/tasks/event/${eventId}`);
//   return response.data;
// };

// export const updateTaskStatus = async (id: string, status: string) => {
//   const response = await axios.patch(`${API_URL}/tasks/${id}/status`, { status });
//   return response.data;
// };
// export const deleteTask = async (id: string) => {
//   const response = await axios.delete(`${API_URL}/tasks/${id}`);
//   return response.data;
// };





import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Event API calls
export const createEvent = async (eventData: any) => {
  try {
    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    console.error('Error in createEvent:', error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error in getAllEvents:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, eventData: any) => {
  try {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error in updateEvent:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteEvent:', error);
    throw error;
  }
};

// Attendee API calls
export const addAttendee = async (attendeeData: any) => {
  try {
    const response = await api.post('/attendees', attendeeData);
    return response.data;
  } catch (error) {
    console.error('Error in addAttendee:', error);
    throw error;
  }
};

export const getAllAttendees = async () => {
  try {
    const response = await api.get('/attendees');
    return response.data;
  } catch (error) {
    console.error('Error in getAllAttendees:', error);
    throw error;
  }
};

export const deleteAttendee = async (id: string) => {
  try {
    const response = await api.delete(`/attendees/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteAttendee:', error);
    throw error;
  }
};

// Task API calls
export const createTask = async (taskData: any) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error in createTask:', error);
    throw error;
  }
};

export const getTasksForEvent = async (eventId: string) => {
  try {
    const response = await api.get(`/tasks/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getTasksForEvent:', error);
    throw error;
  }
};

export const updateTaskStatus = async (id: string, status: string) => {
  try {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error in updateTaskStatus:', error);
    throw error;
  }
};
export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`);
  return response.data;
};


export default api;




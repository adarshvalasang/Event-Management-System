


import React, { useState, useEffect } from 'react';
import { Calendar, Users, CheckSquare, LayoutDashboard } from 'lucide-react';
import EventManagement from './components/EventManagement';
import AttendeeManagement from './components/AttendeeManagement';
import TaskTracker from './components/TaskTracker';
import LandingPage from './components/LandingPage';
import { getAllEvents, getAllAttendees } from './api/api';

export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  attendees: string[];
}

export interface Attendee {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
  eventId: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'attendees' | 'tasks'>('dashboard');
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, attendeesData] = await Promise.all([
          getAllEvents(),
          getAllAttendees()
        ]);
        setEvents(eventsData);
        setAttendees(attendeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <aside className="w-64 bg-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-800">Event Master</h1>
        </div>
        <nav className="mt-6">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'events', icon: Calendar, label: 'Events' },
            { id: 'attendees', icon: Users, label: 'Attendees' },
            { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ease-in-out ${
                activeTab === item.id
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-800'
              }`}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
            >
              <item.icon className="mr-3" size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && <LandingPage />}
        {activeTab === 'events' && (
          <EventManagement events={events} setEvents={setEvents} attendees={attendees} />
        )}
        {activeTab === 'attendees' && (
          <AttendeeManagement attendees={attendees} setAttendees={setAttendees} events={events} setEvents={setEvents} />
        )}
        {activeTab === 'tasks' && (
          <TaskTracker tasks={tasks} setTasks={setTasks} events={events} attendees={attendees} />
        )}
      </main>
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import { Calendar, Users, CheckSquare, LayoutDashboard } from 'lucide-react';
// import EventManagement from './components/EventManagement';
// import AttendeeManagement from './components/AttendeeManagement';
// import TaskTracker from './components/TaskTracker';
// import LandingPage from './components/LandingPage';
// import ApiTest from './components/ApiTest';
// import { getAllEvents, getAllAttendees } from './api/api';

// export interface Event {
//   id: string;
//   name: string;
//   description: string;
//   location: string;
//   date: string;
//   attendees: string[];
// }

// export interface Attendee {
//   id: string;
//   name: string;
// }

// export interface Task {
//   assignedTo: string;
//   deadline: string | number | Date;
//   id: string;
//   name: string;
//   description: string;
//   status: 'Pending' | 'In Progress' | 'Completed';
//   eventId: string;
// }

// const App: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'attendees' | 'tasks'>('dashboard');
//   const [events, setEvents] = useState<Event[]>([]);
//   const [attendees, setAttendees] = useState<Attendee[]>([]);
//   const [tasks, setTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [eventsData, attendeesData] = await Promise.all([
//           getAllEvents(),
//           getAllAttendees()
//         ]);
//         setEvents(eventsData);
//         setAttendees(attendeesData);

//         // Fetch tasks for all events - This part is removed because getTasksForEvent is not imported and the update doesn't include it.
//         // const tasksData = await Promise.all(eventsData.map(event => getTasksForEvent(event.id)));
//         // setTasks(tasksData.flat());
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
//       <aside className="w-64 bg-white shadow-xl">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-indigo-800">Event Master</h1>
//         </div>
//         <nav className="mt-6">
//           {[
//             { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//             { id: 'events', icon: Calendar, label: 'Events' },
//             { id: 'attendees', icon: Users, label: 'Attendees' },
//             { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
//           ].map((item) => (
//             <button
//               key={item.id}
//               className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ease-in-out ${
//                 activeTab === item.id
//                   ? 'bg-indigo-100 text-indigo-800'
//                   : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-800'
//               }`}
//               onClick={() => setActiveTab(item.id as typeof activeTab)}
//             >
//               <item.icon className="mr-3" size={20} />
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </aside>
//       <main className="flex-1 p-8 overflow-y-auto">
//         {activeTab === 'dashboard' && <LandingPage />}
//         {activeTab === 'events' && (
//           <EventManagement events={events} setEvents={setEvents} attendees={attendees} />
//         )}
//         {activeTab === 'attendees' && (
//           <AttendeeManagement attendees={attendees} setAttendees={setAttendees} events={events} setEvents={setEvents} />
//         )}
//         {activeTab === 'tasks' && (
//           <TaskTracker tasks={tasks} setTasks={setTasks} events={events} attendees={attendees} />
//         )}
//         <ApiTest />
//       </main>
//     </div>
//   );
// };

// export default App;




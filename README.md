Event Management System

Technologies Used
Frontend: React.js
Backend: Express.js
Database: (Insert database used here, if applicable)
Other: (Insert any other libraries or tools used)


Setup Instructions
Follow these steps to set up and run the Event Management Dashboard locally:

1. Clone the Repository
Clone the repository to your local machine using the following command:


git clone https://github.com/adarshvalasang/Event-Management-System


2. Install Dependencies
Backend (Express)
Navigate to the backend directory and install the necessary dependencies:


cd backend
npm install


Frontend (React)
Navigate to the frontend directory and install the necessary dependencies:


cd frontend
npm install


3. Running the Servers
Backend Server (Express)
To run the Express backend server, navigate to the backend directory and run:



cd backend
npm start
The backend server will now be running on http://localhost:5000 (or another port, if configured differently).

Frontend Server (React)
To run the React frontend server, navigate to the frontend directory and run:


cd frontend
npm start
The frontend server will now be running on http://localhost:3000.

4. Testing the Application
Once both servers are running, you can visit http://localhost:3000 in your browser to view the Event Management Dashboard.

5. Environment Variables (Optional)
If your application requires specific environment variables (for example, for API keys or database URLs), create a .env file in the respective directories (frontend or backend) and add the variables.

Example .env file for backend:


PORT=5000
DATABASE_URL=<your-database-url>
Example .env file for frontend:

arduino

REACT_APP_API_URL=http://localhost:5000


import express from 'express';
import Task, { ITask } from '../models/Task.js';
import { Express, Request, Response, Router} from 'express';
 //import { Request, Response, Router } from 'express';

const router: Router = express.Router();

// Create a Task
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTask: ITask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
});

// Get Tasks for an Event
router.get('/event/:eventId', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ eventId: req.params.eventId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// Update Task Status
router.patch('/:id/status', async (req : Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
    
  } catch (error) {
    res.status(400).json({ message: 'Error updating task status', error });
  }
});

export default router;


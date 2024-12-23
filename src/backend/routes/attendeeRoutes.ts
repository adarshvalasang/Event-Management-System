import express from 'express';
import Attendee from '../models/Attendee.js';
import Event from '../models/Event.js';
import Task from '../models/Task.js';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

// Get all attendees
router.get('/', async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendees', error });
  }
});

// Create a new attendee
router.post('/', async (req, res) => {
  try {
    const newAttendee = new Attendee(req.body);
    const savedAttendee = await newAttendee.save();
    res.status(201).json(savedAttendee);
  } catch (error) {
    res.status(400).json({ message: 'Error adding attendee', error });
  }
});

// Delete an attendee
router.delete('/:id', async (req, res) => {
  try {
    const deletedAttendee = await Attendee.findByIdAndDelete(req.params.id);
    if (!deletedAttendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    
    // Remove attendee from all events
    await Event.updateMany(
      { attendees: req.params.id },
      { $pull: { attendees: req.params.id } }
    );

    res.json({ message: 'Attendee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting attendee', error });
  }
});

export default router;


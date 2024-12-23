import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  name: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  eventId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true }
});

export default mongoose.model<ITask>('Task', TaskSchema);


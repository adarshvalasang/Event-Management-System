import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  description: string;
  location: string;
  date: Date;
  attendees: mongoose.Types.ObjectId[];
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'Attendee' }]
});

export default mongoose.model<IEvent>('Event', EventSchema);


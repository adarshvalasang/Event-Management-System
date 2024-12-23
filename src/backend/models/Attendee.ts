import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendee extends Document {
  name: string;
}

const AttendeeSchema: Schema = new Schema({
  name: { type: String, required: true }
});

export default mongoose.model<IAttendee>('Attendee', AttendeeSchema);


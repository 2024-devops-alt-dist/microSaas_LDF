import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ _id: false })
class EventAttendee {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['GOING', 'MAYBE', 'NOT_GOING'],
    default: 'MAYBE',
  })
  rsvpStatus: string;

  @Prop({ default: Date.now })
  registeredAt: Date;
}
const EventAttendeeSchema = SchemaFactory.createForClass(EventAttendee);

@Schema({ timestamps: true })
export class Event {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  organizerId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  eventDate: Date;

  @Prop({ type: Object })
  location: {
    type: string; // "ONLINE" | "IN_PERSON"
    address?: string;
    link?: string;
    coordinates?: [number, number];
  };

  @Prop({ type: [EventAttendeeSchema], default: [] })
  attendees: EventAttendee[];
}

export const EventSchema = SchemaFactory.createForClass(Event);

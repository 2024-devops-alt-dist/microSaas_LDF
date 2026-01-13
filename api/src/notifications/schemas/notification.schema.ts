import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  recipientId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  body: string;

  @Prop({ required: true, enum: ['MATCH_FOUND', 'INVITE', 'EVENT', 'SYSTEM'] })
  type: string;

  // Estos campos ayudan al frontend a saber dónde navegar al hacer click
  @Prop({ type: Types.ObjectId })
  relatedId: Types.ObjectId; // Ej: ID del Círculo o del Evento

  @Prop()
  relatedModel: string; // Ej: "Circle", "Event"

  @Prop({ default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

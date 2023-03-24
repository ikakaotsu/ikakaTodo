import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  // @Prop()
  // _id: string;

  @Prop()
  name: string;

  @Prop({ default: false })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

import { UserSchema } from './../auth/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiaryDocument = Diary & Document;

@Schema({ timestamps: true })
export class Diary extends Document {
  @Prop({ required: true })
  ident: string;

  @Prop({ type: Object })
  data: any;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);

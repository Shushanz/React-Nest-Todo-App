import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    id: Number,
    title: String,
    done: Boolean,
})

export interface TodoModel extends mongoose.Document {
        id: number;
        title: string;
        done: boolean;
}

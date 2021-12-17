import { Document, model, Schema } from 'mongoose';

import { IUser } from "../types/users";

// User schema
const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'roles'
  }
});

export default model<IUser & Document>('users', userSchema);

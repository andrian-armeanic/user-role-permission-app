import { Schema } from 'mongoose';

// User schema
export default new Schema({
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


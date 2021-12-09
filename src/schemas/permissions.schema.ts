import { Schema } from 'mongoose';

// Permission schema
export default new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
});

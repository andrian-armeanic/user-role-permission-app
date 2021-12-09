import { Schema } from 'mongoose';

// Role schema
export default new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  permissionIds: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'permissions'
  }],
});

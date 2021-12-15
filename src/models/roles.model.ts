import { Document, model, Schema } from 'mongoose';
import { IRole } from "../types/role";

// Role schema
const roleSchema = new Schema({
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

export default model<IRole & Document>('roles', roleSchema);

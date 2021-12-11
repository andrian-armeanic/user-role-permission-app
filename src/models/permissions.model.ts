import { Document, model, Schema } from 'mongoose';
import { IPermission } from "../types/permission";

// Permission schema
export default model<IPermission & Document>('permissions', new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
}));

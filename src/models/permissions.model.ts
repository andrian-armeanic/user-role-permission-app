import { Document, model, Schema } from 'mongoose';

import { IPermission } from "../types/permission";

// Permission schema
const permissionSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
});

export default model<IPermission & Document>('permissions', permissionSchema);

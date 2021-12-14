import {Document, Model, model, Schema} from 'mongoose';
import { IPermission } from "../types/permission";

// Permission schema
const permissionSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
});
const permissionModel: Model<IPermission & Document> = model<IPermission & Document>('permissions', permissionSchema);

export default permissionModel;

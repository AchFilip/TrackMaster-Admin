import {Document, Schema, Model, model} from 'mongoose';
import {DefaultSchemaOptions} from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface Driver extends Document {
    name: string;
    surname: string;
    phone: number;
    ongoing_orders: number;
    delivered_orders: number;
    canceled_orders: number;
    checked_in: Date;
}

// ------------------------------------------
// Schema definition
const driverSchema = new Schema(
    {
        name: {type: String, required:true},
        surname: {type: String, required:true},
        phone: {type: Number, required:true},
        ongoing_orders: {type: Number, required:true},
        delivered_orders: {type: Number, required:true},
        canceled_orders: {type: Number, required:true},
        checked_in: {type: Date, required:true}
    },
    {...DefaultSchemaOptions}
);

// ------------------------------------------
// Schema model exports
export const DriverModel: Model<Driver> = model<Driver>(
    'Driver', driverSchema, 'Driver'
);

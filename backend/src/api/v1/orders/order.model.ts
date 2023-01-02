import {Document, Schema, Model, model} from 'mongoose';
import {DefaultSchemaOptions} from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface Order extends Document {
    address: string;
    street_number: number;
    zip_code: number;
    floor_level: number;
    volume: number;
    timestamp: {
        added: { type: Date },
        picked_up: { type: Date },
        delivered: { type: Date }
    },
    status: { type: String, required: true },
    driver: { type: String, required: false }
}

// ------------------------------------------
// Schema definition
const orderSchema = new Schema(
    {
        address: {type: String, required: true},
        street_number: {type: Number, required: true},
        zip_code: {type: Number, required: true},
        floor_level: {type: Number, required: true},
        volume: {type: Number, required: true},
        timestamp: {
            added: {type: Date},
            picked_up: {type: Date},
            delivered: {type: Date}
        },
        status: {type: String, required: true},
        driver: {type: String, required: false}
    },
    {...DefaultSchemaOptions}
);

// ------------------------------------------
// Schema model exports
export const OrderModel: Model<Order> = model<Order>(
    'Order', orderSchema, 'Order'
);

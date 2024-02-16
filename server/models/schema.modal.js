import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define Floor Schema
const FloorSchema = new Schema({
    name: {
        type: String,
        required: [true,"name is required"]
    },
    totalBaySize: {
        type: Number,
    },
    totalSmFloors: {
        type: Number,
        default: 0
    },
    totalMdFloors: {
        type: Number,
        default: 0

    },
    totalLgFloors: {
        type: Number,
        default: 0
    },
    totalXlFloors: {
        type: Number,
        default: 0
    },
    Allslots: [
        {
            slot_number: Number,
            slotId: {
                type: Schema.Types.ObjectId,
                ref: 'Car',
            },
            slotName: {
                type: String,
                enum: ["sm", "md", "lg", "xl"]
            }
        }
    ]
});

// Indexes for Floor Schema
FloorSchema.index({ name: 1 }); // Index on floor name

// Define ParkingLot Schema
const ParkingLotSchema = new Schema({
    name: { type: String, required: [true,"name is required"], unique: [true,"name should be quniue"] },
    location: { type: String, required: [true,"location is required"] },
    numberOfFloors: { type: Number, required: [true,"number of floors are required"] },
    floors: [
        {
            name: String,
            floorId: {
                type: Schema.Types.ObjectId, ref: 'Floor',
            }

        }
    ] 
});

// Define Car Schema
const CarSchema = new Schema({
    name: { type: String, required: [true,"car name is required"] },
    floorId: string,
    parkingId: string,
    carType: { type: String, enum: ['sm', 'md', 'lg', 'xl'], required: true },
    allocated: { type: String, enum: ['sm', 'md', 'lg', 'xl'], required: true },
    start: { type: Date, default: Date.now },
    end: { type: Date,  default: Date.now }
});




// Compile models from the schemas
const Floor = mongoose.model('Floor', FloorSchema);
const Car = mongoose.model('Car', CarSchema);
const ParkingLot = mongoose.model('ParkingLot', ParkingLotSchema);

module.exports = { Floor, Car, ParkingLot };

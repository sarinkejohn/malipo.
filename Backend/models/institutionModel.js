import mongoose from 'mongoose';

const institutionSchema = new mongoose.Schema(
  {
    institutionInfo: [
      {
        name: { type: String, required: true },
        regNo: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',

          default: null,
        },
        parent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Parent',

          default: null,
        },
      },
    ],
    location: {
      lat: Number,
      lng: Number,
      address: String,
      name: String,
      vicinity: String,
      googleAddressId: String,
    },
  },
  { timestamps: true }
);

const Institution = mongoose.model('institution', institutionSchema);
export default Institution;

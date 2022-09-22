import mongoose from 'mongoose';
//Add required to items...
const parentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    phone: { type: Number, default: null },
    location: { type: String },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    regNo: [{ type: String, required: true }],
    transaction: { type: Number, default: null },
    avatar: {
      type: String,
      default:
        'https://images.pexels.com/photos/1152999/pexels-photo-1152999.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    status: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Parent = mongoose.model('Parent', parentSchema);
export default Parent;

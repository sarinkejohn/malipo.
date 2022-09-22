import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    gender: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: {
      type: String,
      required: true,
      default:
        'https://images.pexels.com/photos/1152999/pexels-photo-1152999.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    status: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    fees: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fees',

      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;

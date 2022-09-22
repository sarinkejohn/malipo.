import mongoose from 'mongoose';

const feesSchema = new mongoose.Schema(
  {
    fees: [
      {
        amount: { type: Number, required: true },
        cluster: {
          termOne: Number,
          termTwo: Number,
          termThree: Number,
        },
        amountPaid: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
      },
    ],
    extrasFee: {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      amountPaid: { type: Number, required: true },
      isPaid: { type: Boolean, default: false },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      amount: Number,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent',
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Fees = mongoose.model('Fees', feesSchema);
export default Fees;

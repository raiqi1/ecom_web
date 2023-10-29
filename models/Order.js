import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const orderSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        size: {
          type: String,
        },
        qty: {
          type: Number,
        },
        price: {
          type: Number,
        },
        color: {
          color: String,
          image: String,
        },
      },
    ],
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
    },
    paymentResult: {
      id: String,
      status: String,
      email: String,
    },
    total: {
      type: Number,
      required: true,
    },
    totalBeforeDiscount:{
      type: Number,
    },
    couponAplied:{
      type: String,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      default: "Not Processing",
      enum: [
        "Not Processing",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    paidAt:{
        type: Date
    },
    deliveredAt:{
        type: Date
    }
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;

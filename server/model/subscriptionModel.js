import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
})

export default mongoose.model('Subscription', subscriptionSchema);